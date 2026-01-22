using Microsoft.EntityFrameworkCore;
using ugc.API.Data;
using ugc.API.Dtos;
using ugc.API.Models;
using ugc.API.Repositories;

namespace ugc.API.Services;

public interface IHomeService
{
    Task<HomeResponse> GetHomeAsync(CancellationToken cancellationToken = default);
}

public sealed class HomeService : IHomeService
{
    private readonly UgcDbContext _dbContext;
    private readonly IListingRepository _listingRepository;
    private readonly IRepository<Category> _categoryRepository;
    private readonly IRepository<Plan> _planRepository;
    private readonly IRepository<Review> _reviewRepository;

    public HomeService(
        UgcDbContext dbContext,
        IListingRepository listingRepository,
        IRepository<Category> categoryRepository,
        IRepository<Plan> planRepository,
        IRepository<Review> reviewRepository)
    {
        _dbContext = dbContext;
        _listingRepository = listingRepository;
        _categoryRepository = categoryRepository;
        _planRepository = planRepository;
        _reviewRepository = reviewRepository;
    }

    public async Task<HomeResponse> GetHomeAsync(CancellationToken cancellationToken = default)
    {
        var featured = await _dbContext.Listings
            .AsNoTracking()
            .Include(l => l.Category)
            .Include(l => l.Creator)
            .Where(l => l.Status == ListingStatus.Active && l.FeaturedUntil != null)
            .OrderByDescending(l => l.FeaturedUntil)
            .Take(6)
            .ToListAsync(cancellationToken);

        var random = await _dbContext.Listings
            .AsNoTracking()
            .Include(l => l.Category)
            .Where(l => l.Status == ListingStatus.Active)
            .OrderBy(_ => EF.Functions.Random())
            .Take(6)
            .ToListAsync(cancellationToken);

        var categories = await _categoryRepository.ListAsync(cancellationToken);
        var plans = await _planRepository.ListAsync(cancellationToken);
        var reviews = await _reviewRepository.ListAsync(r => r.Status == ReviewStatus.Published, cancellationToken);

        return new HomeResponse
        {
            FeaturedListings = featured,
            RandomListings = random,
            Categories = categories,
            Plans = plans,
            LatestReviews = reviews.OrderByDescending(r => r.CreatedAt).Take(6).ToList()
        };
    }
}
