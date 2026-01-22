using ugc.API.Models;
using ugc.API.Repositories;

namespace ugc.API.Services;

public interface IBoostService
{
    Task<IReadOnlyList<Boost>> GetForListingAsync(Guid listingId, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<Boost>> GetForUserAsync(Guid userId, CancellationToken cancellationToken = default);
}

public sealed class BoostService : IBoostService
{
    private readonly IRepository<Boost> _repository;

    public BoostService(IRepository<Boost> repository)
    {
        _repository = repository;
    }

    public Task<IReadOnlyList<Boost>> GetForListingAsync(Guid listingId, CancellationToken cancellationToken = default)
        => _repository.ListAsync(b => b.ListingId == listingId, cancellationToken);

    public Task<IReadOnlyList<Boost>> GetForUserAsync(Guid userId, CancellationToken cancellationToken = default)
        => _repository.ListAsync(b => b.PaidBy == userId, cancellationToken);
}
