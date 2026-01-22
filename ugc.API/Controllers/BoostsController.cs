using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ugc.API.Auth;
using ugc.API.Models;
using ugc.API.Services;

namespace ugc.API.Controllers;

[ApiController]
[Route("api/boosts")]
public sealed class BoostsController : ControllerBase
{
    private readonly IBoostService _boostService;

    public BoostsController(IBoostService boostService)
    {
        _boostService = boostService;
    }

    [Authorize(AuthConstants.UserPolicy)]
    [HttpGet("my")]
    public async Task<ActionResult<IReadOnlyList<Boost>>> GetMine(CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized();
        }

        var boosts = await _boostService.GetForUserAsync(userId, cancellationToken);
        return Ok(boosts);
    }

    [AllowAnonymous]
    [HttpGet("/api/listings/{id:guid}/boosts")]
    public async Task<ActionResult<IReadOnlyList<Boost>>> GetForListing(Guid id, CancellationToken cancellationToken)
    {
        var boosts = await _boostService.GetForListingAsync(id, cancellationToken);
        return Ok(boosts);
    }
}
