using Microsoft.EntityFrameworkCore;
using ugc.API.Data;

namespace ugc.API.Services;

public interface ISearchService
{
    Task<IReadOnlyList<string>> SuggestAsync(string query, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<string>> FacetsAsync(CancellationToken cancellationToken = default);
}

public sealed class SearchService : ISearchService
{
    private readonly UgcDbContext _dbContext;

    public SearchService(UgcDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<string>> SuggestAsync(string query, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return Array.Empty<string>();
        }

        var normalized = query.Trim();
        return await _dbContext.Listings
            .AsNoTracking()
            .Where(l => EF.Functions.ILike(l.Title, $"%{normalized}%"))
            .OrderByDescending(l => l.CreatedAt)
            .Select(l => l.Title)
            .Distinct()
            .Take(10)
            .ToListAsync(cancellationToken);
    }

    public Task<IReadOnlyList<string>> FacetsAsync(CancellationToken cancellationToken = default)
    {
        return Task.FromResult<IReadOnlyList<string>>(new[]
        {
            "category",
            "price",
            "rating",
            "ai_creator",
            "verified_creator"
        });
    }
}
