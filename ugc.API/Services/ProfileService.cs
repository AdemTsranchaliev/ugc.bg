using ugc.API.Models;
using ugc.API.Repositories;

namespace ugc.API.Services;

public interface IProfileService
{
    Task<User?> GetUserWithProfilesAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<CreatorProfile?> GetCreatorAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<BusinessProfile?> GetBusinessAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<CreatorProfile> UpsertCreatorAsync(Guid userId, CreatorProfile profile, CancellationToken cancellationToken = default);
    Task<BusinessProfile> UpsertBusinessAsync(Guid userId, BusinessProfile profile, CancellationToken cancellationToken = default);
}

public sealed class ProfileService : IProfileService
{
    private readonly IUserRepository _userRepository;
    private readonly IRepository<CreatorProfile> _creatorRepository;
    private readonly IRepository<BusinessProfile> _businessRepository;

    public ProfileService(
        IUserRepository userRepository,
        IRepository<CreatorProfile> creatorRepository,
        IRepository<BusinessProfile> businessRepository)
    {
        _userRepository = userRepository;
        _creatorRepository = creatorRepository;
        _businessRepository = businessRepository;
    }

    public Task<User?> GetUserWithProfilesAsync(Guid userId, CancellationToken cancellationToken = default)
        => _userRepository.GetByIdWithProfilesAsync(userId, cancellationToken);

    public async Task<CreatorProfile?> GetCreatorAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return await _creatorRepository.GetByIdAsync(userId, cancellationToken);
    }

    public async Task<BusinessProfile?> GetBusinessAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return await _businessRepository.GetByIdAsync(userId, cancellationToken);
    }

    public async Task<CreatorProfile> UpsertCreatorAsync(
        Guid userId,
        CreatorProfile profile,
        CancellationToken cancellationToken = default)
    {
        var existing = await _creatorRepository.GetByIdAsync(userId, cancellationToken);
        if (existing is null)
        {
            profile.UserId = userId;
            return await _creatorRepository.AddAsync(profile, cancellationToken);
        }

        existing.DisplayName = profile.DisplayName;
        existing.Bio = profile.Bio;
        existing.Location = profile.Location;
        existing.Languages = profile.Languages;
        existing.RateMin = profile.RateMin;
        existing.RateMax = profile.RateMax;
        existing.SocialTiktok = profile.SocialTiktok;
        existing.SocialInstagram = profile.SocialInstagram;
        existing.SocialYoutube = profile.SocialYoutube;
        existing.Website = profile.Website;
        existing.VerifiedCreator = profile.VerifiedCreator;
        existing.RatingAvg = profile.RatingAvg;
        existing.RatingCount = profile.RatingCount;
        existing.PortfolioCount = profile.PortfolioCount;
        existing.AiCreator = profile.AiCreator;

        await _creatorRepository.UpdateAsync(existing, cancellationToken);
        return existing;
    }

    public async Task<BusinessProfile> UpsertBusinessAsync(
        Guid userId,
        BusinessProfile profile,
        CancellationToken cancellationToken = default)
    {
        var existing = await _businessRepository.GetByIdAsync(userId, cancellationToken);
        if (existing is null)
        {
            profile.UserId = userId;
            return await _businessRepository.AddAsync(profile, cancellationToken);
        }

        existing.CompanyName = profile.CompanyName;
        existing.CompanyNumber = profile.CompanyNumber;
        existing.Website = profile.Website;
        existing.Industry = profile.Industry;
        existing.VerifiedBusiness = profile.VerifiedBusiness;

        await _businessRepository.UpdateAsync(existing, cancellationToken);
        return existing;
    }
}
