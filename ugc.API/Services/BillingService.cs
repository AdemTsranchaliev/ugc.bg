using ugc.API.Dtos;
using ugc.API.Models;
using ugc.API.Repositories;

namespace ugc.API.Services;

public interface IBillingService
{
    Task<CheckoutSessionResponse> CreateSubscriptionSessionAsync(Guid userId, string planCode, CancellationToken cancellationToken = default);
    Task<CheckoutSessionResponse> CreateBoostCheckoutAsync(Guid userId, Guid listingId, BoostKind kind, CancellationToken cancellationToken = default);
    Task<Subscription?> GetActiveSubscriptionAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<bool> CancelSubscriptionAsync(Guid userId, CancellationToken cancellationToken = default);
}

public sealed class BillingService : IBillingService
{
    private readonly IRepository<Subscription> _subscriptionRepository;

    public BillingService(IRepository<Subscription> subscriptionRepository)
    {
        _subscriptionRepository = subscriptionRepository;
    }

    public Task<CheckoutSessionResponse> CreateSubscriptionSessionAsync(
        Guid userId,
        string planCode,
        CancellationToken cancellationToken = default)
    {
        return Task.FromResult(new CheckoutSessionResponse
        {
            SessionId = $"sub_{Guid.NewGuid():N}",
            Url = $"https://billing.example.com/checkout/{Guid.NewGuid():N}"
        });
    }

    public Task<CheckoutSessionResponse> CreateBoostCheckoutAsync(
        Guid userId,
        Guid listingId,
        BoostKind kind,
        CancellationToken cancellationToken = default)
    {
        return Task.FromResult(new CheckoutSessionResponse
        {
            SessionId = $"boost_{Guid.NewGuid():N}",
            Url = $"https://billing.example.com/checkout/{Guid.NewGuid():N}"
        });
    }

    public async Task<Subscription?> GetActiveSubscriptionAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var subscriptions = await _subscriptionRepository.ListAsync(
            s => s.UserId == userId && s.Status == SubscriptionStatus.Active,
            cancellationToken);
        return subscriptions.OrderByDescending(s => s.CurrentPeriodEnd).FirstOrDefault();
    }

    public async Task<bool> CancelSubscriptionAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var active = await GetActiveSubscriptionAsync(userId, cancellationToken);
        if (active is null)
        {
            return false;
        }

        active.Status = SubscriptionStatus.Canceled;
        await _subscriptionRepository.UpdateAsync(active, cancellationToken);
        return true;
    }
}
