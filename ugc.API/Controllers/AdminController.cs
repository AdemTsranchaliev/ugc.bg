using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ugc.API.Auth;
using ugc.API.Services;

namespace ugc.API.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(AuthConstants.AdminPolicy)]
public sealed class AdminController : ControllerBase
{
    private readonly IAdminService _adminService;

    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpGet("moderation/queue")]
    public async Task<IActionResult> ModerationQueue(CancellationToken cancellationToken)
    {
        var queue = await _adminService.GetModerationQueueAsync(cancellationToken);
        return Ok(queue);
    }

    [HttpPost("users/{id:guid}/suspend")]
    public async Task<IActionResult> SuspendUser(Guid id, CancellationToken cancellationToken)
    {
        var suspended = await _adminService.SuspendUserAsync(id, cancellationToken);
        return suspended ? NoContent() : NotFound();
    }

    [HttpPost("listings/{id:guid}/approve")]
    public async Task<IActionResult> ApproveListing(Guid id, CancellationToken cancellationToken)
    {
        var approved = await _adminService.ApproveListingAsync(id, cancellationToken);
        return approved ? NoContent() : NotFound();
    }

    [HttpPost("reviews/{id:guid}/remove")]
    public async Task<IActionResult> RemoveReview(Guid id, CancellationToken cancellationToken)
    {
        var removed = await _adminService.RemoveReviewAsync(id, cancellationToken);
        return removed ? NoContent() : NotFound();
    }
}
