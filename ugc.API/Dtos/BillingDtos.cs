using ugc.API.Models;

namespace ugc.API.Dtos;

public sealed class CreateSubscriptionSessionRequest
{
    public string PlanCode { get; set; } = string.Empty;
}

public sealed class CreateBoostCheckoutRequest
{
    public Guid ListingId { get; set; }
    public BoostKind Kind { get; set; }
}

public sealed class CheckoutSessionResponse
{
    public string SessionId { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
}
