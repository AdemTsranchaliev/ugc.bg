using System.ComponentModel.DataAnnotations;

namespace ugc.API.Models;

public sealed class Payment
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public PaymentType Type { get; set; }

    public BillingProvider Provider { get; set; }

    [MaxLength(128)]
    public string ProviderPaymentId { get; set; } = string.Empty;

    public decimal Amount { get; set; }

    public Currency Currency { get; set; }

    public PaymentStatus Status { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public User User { get; set; } = null!;

    public ICollection<Boost> Boosts { get; set; } = new List<Boost>();
}
