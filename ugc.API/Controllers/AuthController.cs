using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ugc.API.Auth;
using ugc.API.Dtos;
using ugc.API.Models;

namespace ugc.API.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request, CancellationToken cancellationToken)
    {
        var (user, token, refreshToken) = await _authService.RegisterAsync(
            request.Email,
            request.Phone,
            request.Password,
            request.Role,
            cancellationToken);

        return Ok(new AuthResponse
        {
            UserId = user.Id,
            Token = token,
            RefreshToken = refreshToken,
            Role = user.Role.ToString()
        });
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request, CancellationToken cancellationToken)
    {
        var result = await _authService.LoginAsync(request.Email, request.Password, cancellationToken);
        if (result is null)
        {
            return Unauthorized();
        }

        return Ok(new AuthResponse
        {
            UserId = result.Value.user.Id,
            Token = result.Value.token,
            RefreshToken = result.Value.refreshToken,
            Role = result.Value.user.Role.ToString()
        });
    }

    [AllowAnonymous]
    [HttpPost("refresh")]
    public async Task<ActionResult<AuthResponse>> Refresh([FromBody] RefreshRequest request, CancellationToken cancellationToken)
    {
        var result = await _authService.RefreshAsync(request.RefreshToken, cancellationToken);
        if (result is null)
        {
            return Unauthorized();
        }

        return Ok(new AuthResponse
        {
            UserId = result.Value.user.Id,
            Token = result.Value.token,
            RefreshToken = result.Value.refreshToken,
            Role = result.Value.user.Role.ToString()
        });
    }

    [AllowAnonymous]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] RefreshRequest request, CancellationToken cancellationToken)
    {
        var loggedOut = await _authService.LogoutAsync(request.RefreshToken, cancellationToken);
        return loggedOut ? NoContent() : NotFound();
    }

    [AllowAnonymous]
    [HttpPost("verify-email")]
    public async Task<IActionResult> VerifyEmail([FromBody] VerifyEmailRequest request, CancellationToken cancellationToken)
    {
        var verified = await _authService.VerifyEmailAsync(request.Email, request.Token, cancellationToken);
        return verified ? NoContent() : NotFound();
    }

    [AllowAnonymous]
    [HttpPost("verify-email/request")]
    public async Task<IActionResult> RequestEmailVerification([FromBody] RequestEmailVerification request, CancellationToken cancellationToken)
    {
        var token = await _authService.RequestEmailVerificationAsync(request.Email, cancellationToken);
        if (token is null)
        {
            return Accepted();
        }

        return Ok(new { token });
    }

    [AllowAnonymous]
    [HttpPost("verify-phone")]
    public async Task<IActionResult> VerifyPhone([FromBody] VerifyPhoneRequest request, CancellationToken cancellationToken)
    {
        var verified = await _authService.VerifyPhoneAsync(request.Phone, request.Token, cancellationToken);
        return verified ? NoContent() : NotFound();
    }

    [AllowAnonymous]
    [HttpPost("verify-phone/request")]
    public async Task<IActionResult> RequestPhoneVerification([FromBody] RequestPhoneVerification request, CancellationToken cancellationToken)
    {
        var token = await _authService.RequestPhoneVerificationAsync(request.Phone, cancellationToken);
        if (token is null)
        {
            return Accepted();
        }

        return Ok(new { token });
    }

    [AllowAnonymous]
    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request, CancellationToken cancellationToken)
    {
        var token = await _authService.RequestPasswordResetAsync(request.Email, cancellationToken);
        if (token is null)
        {
            return Accepted();
        }

        return Ok(new { token });
    }

    [AllowAnonymous]
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request, CancellationToken cancellationToken)
    {
        var reset = await _authService.ResetPasswordAsync(request.Email, request.Token, request.NewPassword, cancellationToken);
        return reset ? NoContent() : NotFound();
    }
}
