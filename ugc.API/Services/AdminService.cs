using ugc.API.Models;
using ugc.API.Repositories;

namespace ugc.API.Services;

public interface IAdminService
{
    Task<IReadOnlyList<Report>> GetModerationQueueAsync(CancellationToken cancellationToken = default);
    Task<bool> SuspendUserAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<bool> ApproveListingAsync(Guid listingId, CancellationToken cancellationToken = default);
    Task<bool> RemoveReviewAsync(Guid reviewId, CancellationToken cancellationToken = default);
}

public sealed class AdminService : IAdminService
{
    private readonly IRepository<Report> _reportRepository;
    private readonly IRepository<User> _userRepository;
    private readonly IRepository<Listing> _listingRepository;
    private readonly IRepository<Review> _reviewRepository;

    public AdminService(
        IRepository<Report> reportRepository,
        IRepository<User> userRepository,
        IRepository<Listing> listingRepository,
        IRepository<Review> reviewRepository)
    {
        _reportRepository = reportRepository;
        _userRepository = userRepository;
        _listingRepository = listingRepository;
        _reviewRepository = reviewRepository;
    }

    public Task<IReadOnlyList<Report>> GetModerationQueueAsync(CancellationToken cancellationToken = default)
        => _reportRepository.ListAsync(r => r.Status == ReportStatus.Open, cancellationToken);

    public async Task<bool> SuspendUserAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var user = await _userRepository.GetByIdAsync(userId, cancellationToken);
        if (user is null)
        {
            return false;
        }

        user.Status = UserStatus.Suspended;
        await _userRepository.UpdateAsync(user, cancellationToken);
        return true;
    }

    public async Task<bool> ApproveListingAsync(Guid listingId, CancellationToken cancellationToken = default)
    {
        var listing = await _listingRepository.GetByIdAsync(listingId, cancellationToken);
        if (listing is null)
        {
            return false;
        }

        listing.Status = ListingStatus.Active;
        await _listingRepository.UpdateAsync(listing, cancellationToken);
        return true;
    }

    public async Task<bool> RemoveReviewAsync(Guid reviewId, CancellationToken cancellationToken = default)
    {
        var review = await _reviewRepository.GetByIdAsync(reviewId, cancellationToken);
        if (review is null)
        {
            return false;
        }

        review.Status = ReviewStatus.Removed;
        await _reviewRepository.UpdateAsync(review, cancellationToken);
        return true;
    }
}
