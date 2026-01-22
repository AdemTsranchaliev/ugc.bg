using System.ComponentModel.DataAnnotations;

namespace ugc.API.Models;

public sealed class ListingMedia
{
    public Guid Id { get; set; }

    public Guid ListingId { get; set; }

    public ListingMediaType Type { get; set; }

    [MaxLength(2048)]
    public string Url { get; set; } = string.Empty;

    [MaxLength(2048)]
    public string? ThumbUrl { get; set; }

    public int Position { get; set; }

    public Listing Listing { get; set; } = null!;
}
