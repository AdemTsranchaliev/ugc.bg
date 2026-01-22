namespace ugc.API.Models;

public sealed class Boost
{
    public Guid Id { get; set; }

    public Guid ListingId { get; set; }

    public BoostKind Kind { get; set; }

    public DateTimeOffset StartsAt { get; set; }

    public DateTimeOffset EndsAt { get; set; }

    public Guid PaidBy { get; set; }

    public Guid? PaymentId { get; set; }

    public Listing Listing { get; set; } = null!;

    public User PaidByUser { get; set; } = null!;

    public Payment? Payment { get; set; }
}
