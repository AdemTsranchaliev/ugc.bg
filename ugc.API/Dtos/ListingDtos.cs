using ugc.API.Models;

namespace ugc.API.Dtos;

public sealed class ListingSearchQuery
{
    public string? Q { get; set; }
    public int? CategoryId { get; set; }
    public decimal? PriceMin { get; set; }
    public decimal? PriceMax { get; set; }
    public string? Location { get; set; }
    public string? Language { get; set; }
    public bool? Verified { get; set; }
    public bool? AiCreator { get; set; }
    public string? Sort { get; set; }
}

public sealed class ListingUpsertDto
{
    public Guid CreatorId { get; set; }
    public int CategoryId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal? PriceFrom { get; set; }
    public decimal? PriceTo { get; set; }
    public Currency Currency { get; set; }
    public ListingStatus Status { get; set; }
    public DateTimeOffset? ExpiresAt { get; set; }
    public DateTimeOffset? FeaturedUntil { get; set; }
}
