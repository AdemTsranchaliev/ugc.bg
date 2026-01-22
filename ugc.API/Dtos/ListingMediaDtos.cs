using ugc.API.Models;

namespace ugc.API.Dtos;

public sealed class ListingMediaCreateRequest
{
    public ListingMediaType Type { get; set; }
    public string Url { get; set; } = string.Empty;
    public string? ThumbUrl { get; set; }
    public int Position { get; set; }
}
