using Microsoft.EntityFrameworkCore;
using ugc.API.Data;
using ugc.API.Models;
using ugc.API.Repositories;

namespace ugc.API.Services;

public interface IReviewService
{
    Task<IReadOnlyList<Review>> GetByCreatorAsync(Guid creatorId, CancellationToken cancellationToken = default);
    Task<Review> CreateAsync(Guid businessId, Review review, CancellationToken cancellationToken = default);
    Task<bool> UpdateStatusAsync(Guid reviewId, ReviewStatus status, CancellationToken cancellationToken = default);
}

public sealed class ReviewService : IReviewService
{
    private readonly UgcDbContext _dbContext;
    private readonly IRepository<Review> _repository;

    public ReviewService(UgcDbContext dbContext, IRepository<Review> repository)
    {
        _dbContext = dbContext;
        _repository = repository;
    }

    public async Task<IReadOnlyList<Review>> GetByCreatorAsync(Guid creatorId, CancellationToken cancellationToken = default)
    {
        return await _dbContext.Reviews
            .AsNoTracking()
            .Where(r => r.CreatorId == creatorId && r.Status == ReviewStatus.Published)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public Task<Review> CreateAsync(Guid businessId, Review review, CancellationToken cancellationToken = default)
    {
        review.Id = Guid.NewGuid();
        review.BusinessId = businessId;
        review.CreatedAt = DateTimeOffset.UtcNow;
        review.Status = ReviewStatus.Pending;
        return _repository.AddAsync(review, cancellationToken);
    }

    public async Task<bool> UpdateStatusAsync(Guid reviewId, ReviewStatus status, CancellationToken cancellationToken = default)
    {
        var existing = await _repository.GetByIdAsync(reviewId, cancellationToken);
        if (existing is null)
        {
            return false;
        }

        existing.Status = status;
        if (status == ReviewStatus.Published && existing.VisibleAt is null)
        {
            existing.VisibleAt = DateTimeOffset.UtcNow;
        }

        await _repository.UpdateAsync(existing, cancellationToken);
        return true;
    }
}
