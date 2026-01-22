using ugc.API.Models;
using ugc.API.Repositories;

namespace ugc.API.Services;

public interface IListingMediaService
{
    Task<IReadOnlyList<ListingMedia>> GetForListingAsync(Guid listingId, CancellationToken cancellationToken = default);
    Task<ListingMedia> AddAsync(Guid listingId, ListingMedia media, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid mediaId, CancellationToken cancellationToken = default);
}

public sealed class ListingMediaService : IListingMediaService
{
    private readonly IRepository<ListingMedia> _repository;

    public ListingMediaService(IRepository<ListingMedia> repository)
    {
        _repository = repository;
    }

    public Task<IReadOnlyList<ListingMedia>> GetForListingAsync(Guid listingId, CancellationToken cancellationToken = default)
        => _repository.ListAsync(m => m.ListingId == listingId, cancellationToken);

    public Task<ListingMedia> AddAsync(Guid listingId, ListingMedia media, CancellationToken cancellationToken = default)
    {
        media.Id = Guid.NewGuid();
        media.ListingId = listingId;
        return _repository.AddAsync(media, cancellationToken);
    }

    public async Task<bool> DeleteAsync(Guid mediaId, CancellationToken cancellationToken = default)
    {
        var existing = await _repository.GetByIdAsync(mediaId, cancellationToken);
        if (existing is null)
        {
            return false;
        }

        await _repository.DeleteAsync(existing, cancellationToken);
        return true;
    }
}
