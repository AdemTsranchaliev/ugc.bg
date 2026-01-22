using ugc.API.Models;

namespace ugc.API.Dtos;

public sealed class HomeResponse
{
    public IReadOnlyList<Listing> FeaturedListings { get; set; } = Array.Empty<Listing>();
    public IReadOnlyList<Listing> RandomListings { get; set; } = Array.Empty<Listing>();
    public IReadOnlyList<Category> Categories { get; set; } = Array.Empty<Category>();
    public IReadOnlyList<Plan> Plans { get; set; } = Array.Empty<Plan>();
    public IReadOnlyList<Review> LatestReviews { get; set; } = Array.Empty<Review>();
}
