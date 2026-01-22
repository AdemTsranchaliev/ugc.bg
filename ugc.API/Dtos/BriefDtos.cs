using System.Text.Json;
using ugc.API.Models;

namespace ugc.API.Dtos;

public sealed class BriefUpsertRequest
{
    public ProjectBriefType Type { get; set; }
    public string? Niche { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public JsonDocument? Requirements { get; set; }
    public decimal? BudgetMin { get; set; }
    public decimal? BudgetMax { get; set; }
    public DateOnly? Deadline { get; set; }
    public DeliveryPolicy DeliveryPolicy { get; set; }
    public JsonDocument? Links { get; set; }
}

public sealed class BriefApplyRequest
{
    public string ProposalText { get; set; } = string.Empty;
    public decimal? PriceOffer { get; set; }
    public int? EtaDays { get; set; }
}

public sealed class BriefApplicationStatusRequest
{
    public BriefApplicationStatus Status { get; set; }
}
