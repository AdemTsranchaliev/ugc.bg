using System.ComponentModel.DataAnnotations;

namespace ugc.API.Models;

public sealed class Subscription
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    [MaxLength(32)]
    public string PlanCode { get; set; } = string.Empty;

    public BillingProvider Provider { get; set; }

    [MaxLength(128)]
    public string ProviderSubId { get; set; } = string.Empty;

    public SubscriptionStatus Status { get; set; }

    public DateTimeOffset CurrentPeriodEnd { get; set; }

    public User User { get; set; } = null!;

    public Plan Plan { get; set; } = null!;
}
