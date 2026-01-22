using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace ugc.API.Models;

public sealed class AuditLog
{
    public Guid Id { get; set; }

    public Guid ActorId { get; set; }

    [MaxLength(200)]
    public string Action { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Entity { get; set; } = string.Empty;

    public Guid EntityId { get; set; }

    public JsonDocument? Diff { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public User Actor { get; set; } = null!;
}
