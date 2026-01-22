using System.ComponentModel.DataAnnotations;

namespace ugc.API.Models;

public sealed class Report
{
    public Guid Id { get; set; }

    public ReportedEntity ReportedEntity { get; set; }

    public Guid EntityId { get; set; }

    public Guid ReporterId { get; set; }

    [MaxLength(1000)]
    public string Reason { get; set; } = string.Empty;

    public ReportStatus Status { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public User Reporter { get; set; } = null!;
}
