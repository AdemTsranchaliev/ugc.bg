using ugc.API.Models;

namespace ugc.API.Dtos;

public sealed class ReportCreateRequest
{
    public ReportedEntity ReportedEntity { get; set; }
    public Guid EntityId { get; set; }
    public string Reason { get; set; } = string.Empty;
}
