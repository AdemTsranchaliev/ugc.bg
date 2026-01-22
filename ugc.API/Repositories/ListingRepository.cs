using Microsoft.EntityFrameworkCore;
using ugc.API.Data;
using ugc.API.Models;

namespace ugc.API.Repositories;

public sealed class ListingRepository : EfRepository<Listing>, IListingRepository
{
    public ListingRepository(UgcDbContext dbContext)
        : base(dbContext)
    {
    }

    public async Task<IReadOnlyList<Listing>> SearchAsync(
        string? query,
        int? categoryId,
        decimal? priceMin,
        decimal? priceMax,
        string? location,
        string? language,
        bool? verified,
        bool? aiCreator,
        string? sort,
        CancellationToken cancellationToken = default)
    {
        IQueryable<Listing> listings = DbContext.Listings
            .AsNoTracking()
            .Include(l => l.Creator)
            .ThenInclude(u => u.CreatorProfile)
            .Include(l => l.Category);

        if (!string.IsNullOrWhiteSpace(query))
        {
            listings = listings.Where(l => EF.Functions.ILike(l.Title, $"%{query}%")
                                           || EF.Functions.ILike(l.Description, $"%{query}%"));
        }

        if (categoryId.HasValue)
        {
            listings = listings.Where(l => l.CategoryId == categoryId.Value);
        }

        if (priceMin.HasValue)
        {
            listings = listings.Where(l => l.PriceTo == null || l.PriceTo >= priceMin.Value);
        }

        if (priceMax.HasValue)
        {
            listings = listings.Where(l => l.PriceFrom == null || l.PriceFrom <= priceMax.Value);
        }

        if (!string.IsNullOrWhiteSpace(location))
        {
            listings = listings.Where(l => l.Creator.CreatorProfile != null
                                           && l.Creator.CreatorProfile.Location != null
                                           && EF.Functions.ILike(l.Creator.CreatorProfile.Location, $"%{location}%"));
        }

        if (!string.IsNullOrWhiteSpace(language))
        {
            listings = listings.Where(l => l.Creator.CreatorProfile != null
                                           && l.Creator.CreatorProfile.Languages.Contains(language));
        }

        if (verified.HasValue && verified.Value)
        {
            listings = listings.Where(l => l.Creator.CreatorProfile != null
                                           && l.Creator.CreatorProfile.VerifiedCreator);
        }

        if (aiCreator.HasValue)
        {
            listings = listings.Where(l => l.Creator.CreatorProfile != null
                                           && l.Creator.CreatorProfile.AiCreator == aiCreator.Value);
        }

        listings = sort?.ToLowerInvariant() switch
        {
            "price_asc" => listings.OrderBy(l => l.PriceFrom),
            "price_desc" => listings.OrderByDescending(l => l.PriceFrom),
            "featured" => listings.OrderByDescending(l => l.FeaturedUntil).ThenByDescending(l => l.CreatedAt),
            "newest" => listings.OrderByDescending(l => l.CreatedAt),
            _ => listings.OrderByDescending(l => l.CreatedAt)
        };

        return await listings.ToListAsync(cancellationToken);
    }

    public async Task<Listing?> GetByIdWithMediaAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await DbContext.Listings
            .AsNoTracking()
            .Include(l => l.Creator)
            .ThenInclude(u => u.CreatorProfile)
            .Include(l => l.Category)
            .Include(l => l.Media)
            .FirstOrDefaultAsync(l => l.Id == id, cancellationToken);
    }
}
