using System.ComponentModel.DataAnnotations;

namespace ugc.API.Models;

public sealed class Listing
{
    public Guid Id { get; set; }

    public Guid CreatorId { get; set; }

    public int CategoryId { get; set; }

    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(5000)]
    public string Description { get; set; } = string.Empty;

    public decimal? PriceFrom { get; set; }

    public decimal? PriceTo { get; set; }

    public Currency Currency { get; set; }

    public ListingStatus Status { get; set; }

    public DateTimeOffset? ExpiresAt { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset? UpdatedAt { get; set; }

    public DateTimeOffset? FeaturedUntil { get; set; }

    public User Creator { get; set; } = null!;

    public Category Category { get; set; } = null!;

    public ICollection<ListingMedia> Media { get; set; } = new List<ListingMedia>();

    public ICollection<Boost> Boosts { get; set; } = new List<Boost>();
}
