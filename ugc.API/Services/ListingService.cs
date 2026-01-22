using ugc.API.Models;
using ugc.API.Repositories;

namespace ugc.API.Services;

public interface IListingService
{
    Task<IReadOnlyList<Listing>> SearchAsync(
        string? query,
        int? categoryId,
        decimal? priceMin,
        decimal? priceMax,
        string? location,
        string? language,
        bool? verified,
        bool? aiCreator,
        string? sort,
        CancellationToken cancellationToken = default);

    Task<Listing?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Listing> CreateAsync(Listing listing, CancellationToken cancellationToken = default);
    Task<bool> UpdateAsync(Listing listing, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    Task<bool> RenewAsync(Guid id, CancellationToken cancellationToken = default);
}

public sealed class ListingService : IListingService
{
    private static readonly TimeSpan ListingLifetime = TimeSpan.FromDays(30);
    private readonly IListingRepository _repository;

    public ListingService(IListingRepository repository)
    {
        _repository = repository;
    }

    public Task<IReadOnlyList<Listing>> SearchAsync(
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
        return _repository.SearchAsync(
            query,
            categoryId,
            priceMin,
            priceMax,
            location,
            language,
            verified,
            aiCreator,
            sort,
            cancellationToken);
    }

    public Task<Listing?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => _repository.GetByIdWithMediaAsync(id, cancellationToken);

    public Task<Listing> CreateAsync(Listing listing, CancellationToken cancellationToken = default)
    {
        listing.Id = listing.Id == Guid.Empty ? Guid.NewGuid() : listing.Id;
        listing.CreatedAt = DateTimeOffset.UtcNow;
        listing.ExpiresAt ??= listing.CreatedAt.Add(ListingLifetime);
        listing.Status = listing.Status == 0 ? ListingStatus.Active : listing.Status;
        return _repository.AddAsync(listing, cancellationToken);
    }

    public async Task<bool> UpdateAsync(Listing listing, CancellationToken cancellationToken = default)
    {
        var existing = await _repository.GetByIdAsync(listing.Id, cancellationToken);
        if (existing is null)
        {
            return false;
        }

        existing.Title = listing.Title;
        existing.Description = listing.Description;
        existing.CategoryId = listing.CategoryId;
        existing.PriceFrom = listing.PriceFrom;
        existing.PriceTo = listing.PriceTo;
        existing.Currency = listing.Currency;
        existing.Status = listing.Status;
        existing.FeaturedUntil = listing.FeaturedUntil;
        existing.UpdatedAt = DateTimeOffset.UtcNow;

        await _repository.UpdateAsync(existing, cancellationToken);
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var existing = await _repository.GetByIdAsync(id, cancellationToken);
        if (existing is null)
        {
            return false;
        }

        await _repository.DeleteAsync(existing, cancellationToken);
        return true;
    }

    public async Task<bool> RenewAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var existing = await _repository.GetByIdAsync(id, cancellationToken);
        if (existing is null)
        {
            return false;
        }

        var now = DateTimeOffset.UtcNow;
        existing.ExpiresAt = now.Add(ListingLifetime);
        existing.Status = ListingStatus.Active;
        existing.UpdatedAt = now;

        await _repository.UpdateAsync(existing, cancellationToken);
        return true;
    }
}
