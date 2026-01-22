using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ugc.API.Auth;
using ugc.API.Dtos;
using ugc.API.Services;

namespace ugc.API.Controllers;

[ApiController]
[Route("api/billing")]
public sealed class BillingController : ControllerBase
{
    private readonly IBillingService _billingService;

    public BillingController(IBillingService billingService)
    {
        _billingService = billingService;
    }

    [Authorize(AuthConstants.UserPolicy)]
    [HttpPost("create-subscription-session")]
    public async Task<ActionResult<CheckoutSessionResponse>> CreateSubscriptionSession(
        [FromBody] CreateSubscriptionSessionRequest request,
        CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized();
        }

        var session = await _billingService.CreateSubscriptionSessionAsync(userId, request.PlanCode, cancellationToken);
        return Ok(session);
    }

    [Authorize(AuthConstants.UserPolicy)]
    [HttpPost("create-boost-checkout")]
    public async Task<ActionResult<CheckoutSessionResponse>> CreateBoostCheckout(
        [FromBody] CreateBoostCheckoutRequest request,
        CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized();
        }

        var session = await _billingService.CreateBoostCheckoutAsync(userId, request.ListingId, request.Kind, cancellationToken);
        return Ok(session);
    }

    [AllowAnonymous]
    [HttpPost("webhook/stripe")]
    public IActionResult StripeWebhook()
    {
        return Ok();
    }

    [Authorize(AuthConstants.UserPolicy)]
    [HttpGet("subscription")]
    public async Task<IActionResult> GetSubscription(CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized();
        }

        var subscription = await _billingService.GetActiveSubscriptionAsync(userId, cancellationToken);
        return Ok(subscription);
    }

    [Authorize(AuthConstants.UserPolicy)]
    [HttpPost("cancel")]
    public async Task<IActionResult> Cancel(CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized();
        }

        var canceled = await _billingService.CancelSubscriptionAsync(userId, cancellationToken);
        return canceled ? NoContent() : NotFound();
    }
}
