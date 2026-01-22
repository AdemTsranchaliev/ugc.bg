using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ugc.API.Auth;
using ugc.API.Dtos;
using ugc.API.Models;
using ugc.API.Services;

namespace ugc.API.Controllers;

[ApiController]
[Route("api/reviews")]
public sealed class ReviewsController : ControllerBase
{
    private readonly IReviewService _reviewService;

    public ReviewsController(IReviewService reviewService)
    {
        _reviewService = reviewService;
    }

    [Authorize(AuthConstants.UserPolicy)]
    [HttpPost]
    public async Task<ActionResult<Review>> Create([FromBody] ReviewCreateRequest request, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized();
        }

        var review = new Review
        {
            CreatorId = request.CreatorId,
            Rating = request.Rating,
            Title = request.Title,
            Comment = request.Comment
        };

        var created = await _reviewService.CreateAsync(userId, review, cancellationToken);
        return Ok(created);
    }

    [Authorize(AuthConstants.UserPolicy)]
    [HttpPost("{id:guid}/dispute")]
    public async Task<IActionResult> Dispute(Guid id, CancellationToken cancellationToken)
    {
        var updated = await _reviewService.UpdateStatusAsync(id, ReviewStatus.Disputed, cancellationToken);
        return updated ? NoContent() : NotFound();
    }

    [Authorize(AuthConstants.AdminPolicy)]
    [HttpPost("{id:guid}/moderate")]
    public async Task<IActionResult> Moderate(Guid id, [FromBody] ReviewModerateRequest request, CancellationToken cancellationToken)
    {
        var updated = await _reviewService.UpdateStatusAsync(id, request.Status, cancellationToken);
        return updated ? NoContent() : NotFound();
    }
}
