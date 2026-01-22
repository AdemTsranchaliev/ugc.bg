using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace ugc.API.Models;

public sealed class ProjectBrief
{
    public Guid Id { get; set; }

    public Guid BusinessId { get; set; }

    public ProjectBriefType Type { get; set; }

    [MaxLength(120)]
    public string? Niche { get; set; }

    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(5000)]
    public string Description { get; set; } = string.Empty;

    public JsonDocument? Requirements { get; set; }

    public decimal? BudgetMin { get; set; }

    public decimal? BudgetMax { get; set; }

    public DateOnly? Deadline { get; set; }

    public DeliveryPolicy DeliveryPolicy { get; set; }

    public JsonDocument? Links { get; set; }

    public ProjectBriefStatus Status { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public User Business { get; set; } = null!;

    public ICollection<BriefApplication> Applications { get; set; } = new List<BriefApplication>();

    public ICollection<Conversation> Conversations { get; set; } = new List<Conversation>();
}
