using ugc.API.Models;

namespace ugc.API.Repositories;

public interface IListingRepository : IRepository<Listing>
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

    Task<Listing?> GetByIdWithMediaAsync(Guid id, CancellationToken cancellationToken = default);
}
