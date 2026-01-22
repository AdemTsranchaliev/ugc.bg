using ugc.API.Models;

namespace ugc.API.Dtos;

public sealed class ReviewCreateRequest
{
    public Guid CreatorId { get; set; }
    public int Rating { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Comment { get; set; } = string.Empty;
}

public sealed class ReviewModerateRequest
{
    public ReviewStatus Status { get; set; }
}
