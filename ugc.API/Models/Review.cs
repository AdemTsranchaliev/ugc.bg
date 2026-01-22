using System.ComponentModel.DataAnnotations;

namespace ugc.API.Models;

public sealed class Review
{
    public Guid Id { get; set; }

    public Guid CreatorId { get; set; }

    public Guid BusinessId { get; set; }

    public int Rating { get; set; }

    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string Comment { get; set; } = string.Empty;

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset? VisibleAt { get; set; }

    public ReviewStatus Status { get; set; }

    public User Creator { get; set; } = null!;

    public User Business { get; set; } = null!;
}
