using System.ComponentModel.DataAnnotations;

namespace ugc.API.Models;

public sealed class Plan
{
    public Guid Id { get; set; }

    [MaxLength(32)]
    public string Code { get; set; } = string.Empty;

    [MaxLength(120)]
    public string Name { get; set; } = string.Empty;

    public decimal PriceMonth { get; set; }

    public Currency Currency { get; set; }

    public int ListingsLimit { get; set; }

    public int IncludedBoosts { get; set; }

    public int PriorityLevel { get; set; }

    public ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();
}
