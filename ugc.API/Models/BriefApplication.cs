using System.ComponentModel.DataAnnotations;

namespace ugc.API.Models;

public sealed class BriefApplication
{
    public Guid Id { get; set; }

    public Guid BriefId { get; set; }

    public Guid CreatorId { get; set; }

    [MaxLength(4000)]
    public string ProposalText { get; set; } = string.Empty;

    public decimal? PriceOffer { get; set; }

    public int? EtaDays { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public BriefApplicationStatus Status { get; set; }

    public ProjectBrief Brief { get; set; } = null!;

    public User Creator { get; set; } = null!;
}
