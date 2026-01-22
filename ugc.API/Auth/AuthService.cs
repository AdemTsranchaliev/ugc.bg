using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ugc.API.Data;
using ugc.API.Models;

namespace ugc.API.Auth;

public interface IAuthService
{
    Task<(User user, string token, string refreshToken)> RegisterAsync(string email, string? phone, string password, UserRole role, CancellationToken cancellationToken = default);
    Task<(User user, string token, string refreshToken)?> LoginAsync(string email, string password, CancellationToken cancellationToken = default);
    Task<(User user, string token, string refreshToken)?> RefreshAsync(string refreshToken, CancellationToken cancellationToken = default);
    Task<bool> LogoutAsync(string refreshToken, CancellationToken cancellationToken = default);
    Task<string?> RequestEmailVerificationAsync(string email, CancellationToken cancellationToken = default);
    Task<bool> VerifyEmailAsync(string email, string token, CancellationToken cancellationToken = default);
    Task<string?> RequestPhoneVerificationAsync(string phone, CancellationToken cancellationToken = default);
    Task<bool> VerifyPhoneAsync(string phone, string token, CancellationToken cancellationToken = default);
    Task<string?> RequestPasswordResetAsync(string email, CancellationToken cancellationToken = default);
    Task<bool> ResetPasswordAsync(string email, string token, string newPassword, CancellationToken cancellationToken = default);
}

public sealed class AuthService : IAuthService
{
    private static readonly TimeSpan VerificationTokenLifetime = TimeSpan.FromHours(2);
    private static readonly TimeSpan ResetTokenLifetime = TimeSpan.FromHours(2);
    private static readonly TimeSpan RefreshTokenLifetime = TimeSpan.FromDays(14);

    private readonly UgcDbContext _dbContext;
    private readonly IAuthTokenService _tokenService;
    private readonly PasswordHasher<User> _passwordHasher;

    public AuthService(UgcDbContext dbContext, IAuthTokenService tokenService, PasswordHasher<User> passwordHasher)
    {
        _dbContext = dbContext;
        _tokenService = tokenService;
        _passwordHasher = passwordHasher;
    }

    public async Task<(User user, string token, string refreshToken)> RegisterAsync(
        string email,
        string? phone,
        string password,
        UserRole role,
        CancellationToken cancellationToken = default)
    {
        var normalizedEmail = email.Trim().ToLowerInvariant();
        var exists = await _dbContext.Users.AnyAsync(u => u.Email == normalizedEmail, cancellationToken);
        if (exists)
        {
            throw new InvalidOperationException("Email already exists.");
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = normalizedEmail,
            Phone = phone,
            Role = role,
            Status = UserStatus.Active,
            CreatedAt = DateTimeOffset.UtcNow
        };

        user.PasswordHash = _passwordHasher.HashPassword(user, password);
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var token = _tokenService.CreateToken(user);
        var refresh = await CreateRefreshTokenAsync(user, cancellationToken);
        return (user, token, refresh);
    }

    public async Task<(User user, string token, string refreshToken)?> LoginAsync(
        string email,
        string password,
        CancellationToken cancellationToken = default)
    {
        var normalizedEmail = email.Trim().ToLowerInvariant();
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == normalizedEmail, cancellationToken);
        if (user is null)
        {
            return null;
        }

        var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
        if (result == PasswordVerificationResult.Failed)
        {
            return null;
        }

        user.LastLoginAt = DateTimeOffset.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);

        var token = _tokenService.CreateToken(user);
        var refresh = await CreateRefreshTokenAsync(user, cancellationToken);
        return (user, token, refresh);
    }

    public async Task<(User user, string token, string refreshToken)?> RefreshAsync(
        string refreshToken,
        CancellationToken cancellationToken = default)
    {
        var existing = await _dbContext.RefreshTokens
            .Include(t => t.User)
            .FirstOrDefaultAsync(t => t.Token == refreshToken, cancellationToken);

        if (existing is null || existing.RevokedAt != null || existing.ExpiresAt <= DateTimeOffset.UtcNow)
        {
            return null;
        }

        existing.RevokedAt = DateTimeOffset.UtcNow;
        var newRefresh = await CreateRefreshTokenAsync(existing.User, cancellationToken);
        var token = _tokenService.CreateToken(existing.User);
        return (existing.User, token, newRefresh);
    }

    public async Task<bool> LogoutAsync(string refreshToken, CancellationToken cancellationToken = default)
    {
        var existing = await _dbContext.RefreshTokens
            .FirstOrDefaultAsync(t => t.Token == refreshToken, cancellationToken);
        if (existing is null || existing.RevokedAt != null)
        {
            return false;
        }

        existing.RevokedAt = DateTimeOffset.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<string?> RequestEmailVerificationAsync(string email, CancellationToken cancellationToken = default)
    {
        var normalizedEmail = email.Trim().ToLowerInvariant();
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == normalizedEmail, cancellationToken);
        if (user is null)
        {
            return null;
        }

        var token = GenerateToken();
        _dbContext.EmailVerificationTokens.Add(new EmailVerificationToken
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            Token = token,
            CreatedAt = DateTimeOffset.UtcNow,
            ExpiresAt = DateTimeOffset.UtcNow.Add(VerificationTokenLifetime)
        });
        await _dbContext.SaveChangesAsync(cancellationToken);
        return token;
    }

    public async Task<bool> VerifyEmailAsync(string email, string token, CancellationToken cancellationToken = default)
    {
        var normalizedEmail = email.Trim().ToLowerInvariant();
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == normalizedEmail, cancellationToken);
        if (user is null)
        {
            return false;
        }

        var match = await _dbContext.EmailVerificationTokens
            .Where(t => t.UserId == user.Id && t.Token == token && t.UsedAt == null)
            .OrderByDescending(t => t.CreatedAt)
            .FirstOrDefaultAsync(cancellationToken);

        if (match is null || match.ExpiresAt <= DateTimeOffset.UtcNow)
        {
            return false;
        }

        match.UsedAt = DateTimeOffset.UtcNow;
        user.IsEmailVerified = true;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<string?> RequestPhoneVerificationAsync(string phone, CancellationToken cancellationToken = default)
    {
        var normalizedPhone = phone.Trim();
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Phone == normalizedPhone, cancellationToken);
        if (user is null)
        {
            return null;
        }

        var token = GenerateToken();
        _dbContext.PhoneVerificationTokens.Add(new PhoneVerificationToken
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            Token = token,
            CreatedAt = DateTimeOffset.UtcNow,
            ExpiresAt = DateTimeOffset.UtcNow.Add(VerificationTokenLifetime)
        });
        await _dbContext.SaveChangesAsync(cancellationToken);
        return token;
    }

    public async Task<bool> VerifyPhoneAsync(string phone, string token, CancellationToken cancellationToken = default)
    {
        var normalizedPhone = phone.Trim();
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Phone == normalizedPhone, cancellationToken);
        if (user is null)
        {
            return false;
        }

        var match = await _dbContext.PhoneVerificationTokens
            .Where(t => t.UserId == user.Id && t.Token == token && t.UsedAt == null)
            .OrderByDescending(t => t.CreatedAt)
            .FirstOrDefaultAsync(cancellationToken);

        if (match is null || match.ExpiresAt <= DateTimeOffset.UtcNow)
        {
            return false;
        }

        match.UsedAt = DateTimeOffset.UtcNow;
        user.IsPhoneVerified = true;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<string?> RequestPasswordResetAsync(string email, CancellationToken cancellationToken = default)
    {
        var normalizedEmail = email.Trim().ToLowerInvariant();
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == normalizedEmail, cancellationToken);
        if (user is null)
        {
            return null;
        }

        var token = GenerateToken();
        _dbContext.PasswordResetTokens.Add(new PasswordResetToken
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            Token = token,
            CreatedAt = DateTimeOffset.UtcNow,
            ExpiresAt = DateTimeOffset.UtcNow.Add(ResetTokenLifetime)
        });
        await _dbContext.SaveChangesAsync(cancellationToken);
        return token;
    }

    public async Task<bool> ResetPasswordAsync(string email, string token, string newPassword, CancellationToken cancellationToken = default)
    {
        var normalizedEmail = email.Trim().ToLowerInvariant();
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == normalizedEmail, cancellationToken);
        if (user is null)
        {
            return false;
        }

        var match = await _dbContext.PasswordResetTokens
            .Where(t => t.UserId == user.Id && t.Token == token && t.UsedAt == null)
            .OrderByDescending(t => t.CreatedAt)
            .FirstOrDefaultAsync(cancellationToken);

        if (match is null || match.ExpiresAt <= DateTimeOffset.UtcNow)
        {
            return false;
        }

        match.UsedAt = DateTimeOffset.UtcNow;
        user.PasswordHash = _passwordHasher.HashPassword(user, newPassword);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    private async Task<string> CreateRefreshTokenAsync(User user, CancellationToken cancellationToken)
    {
        var token = GenerateToken();
        _dbContext.RefreshTokens.Add(new RefreshToken
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            Token = token,
            CreatedAt = DateTimeOffset.UtcNow,
            ExpiresAt = DateTimeOffset.UtcNow.Add(RefreshTokenLifetime)
        });
        await _dbContext.SaveChangesAsync(cancellationToken);
        return token;
    }

    private static string GenerateToken()
    {
        var bytes = RandomNumberGenerator.GetBytes(48);
        return Convert.ToBase64String(bytes);
    }
}
