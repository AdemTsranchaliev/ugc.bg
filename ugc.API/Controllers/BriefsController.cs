using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ugc.API.Auth;
using ugc.API.Dtos;
using ugc.API.Models;
using ugc.API.Services;

namespace ugc.API.Controllers;

[ApiController]
[Route("api/briefs")]
public sealed class BriefsController : ControllerBase
{
    private readonly IBriefService _briefService;

    public BriefsController(IBriefService briefService)
    {
        _briefService = briefService;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ProjectBrief>>> GetPublic(CancellationToken cancellationToken)
    {
        var briefs = await _briefService.GetPublicAsync(cancellationToken);
        return Ok(briefs);
    }

    [AllowAnonymous]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProjectBrief>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var brief = await _briefService.GetByIdAsync(id, cancellationToken);
        if (brief is null)
        {
            return NotFound();
        }

        return Ok(brief);
    }

    [Authorize(AuthConstants.UserPolicy)]
    [HttpPost]
    public async Task<ActionResult<ProjectBrief>> Create([FromBody] BriefUpsertRequest request, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized();
        }

        var brief = new ProjectBrief
        {
            Type = request.Type,
            Niche = request.Niche,
            Title = request.Title,
            Description = request.Description,
            Requirements = request.Requirements,
            BudgetMin = request.BudgetMin,
            BudgetMax = request.BudgetMax,
            Deadline = request.Deadline,
            DeliveryPolicy = request.DeliveryPolicy,
            Links = request.Links
        };

        var created = await _briefService.CreateAsync(userId, brief, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [Authorize(AuthConstants.UserPolicy)]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] BriefUpsertRequest request, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized();
        }

        var updated = await _briefService.UpdateAsync(id, userId, new ProjectBrief
        {
            Type = request.Type,
            Niche = request.Niche,
            Title = request.Title,
            Description = request.Description,
            Requirements = request.Requirements,
            BudgetMin = request.BudgetMin,
            BudgetMax = request.BudgetMax,
            Deadline = request.Deadline,
            DeliveryPolicy = request.DeliveryPolicy,
            Links = request.Links
        }, cancellationToken);

        return updated ? NoContent() : NotFound();
    }

    [Authorize(AuthConstants.UserPolicy)]
    [HttpPost("{id:guid}/close")]
    public async Task<IActionResult> Close(Guid id, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized();
        }

        var closed = await _briefService.CloseAsync(id, userId, cancellationToken);
        return closed ? NoContent() : NotFound();
    }

    [Authorize(AuthConstants.UserPolicy)]
    [HttpPost("{id:guid}/apply")]
    public async Task<ActionResult<BriefApplication>> Apply(Guid id, [FromBody] BriefApplyRequest request, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized();
        }

        var application = new BriefApplication
        {
            ProposalText = request.ProposalText,
            PriceOffer = request.PriceOffer,
            EtaDays = request.EtaDays
        };

        var created = await _briefService.ApplyAsync(id, userId, application, cancellationToken);
        return Ok(created);
    }

    [Authorize(AuthConstants.UserPolicy)]
    [HttpPost("{id:guid}/applications/{appId:guid}/status")]
    public async Task<IActionResult> UpdateApplicationStatus(Guid id, Guid appId, [FromBody] BriefApplicationStatusRequest request, CancellationToken cancellationToken)
    {
        var updated = await _briefService.UpdateApplicationStatusAsync(appId, request.Status, cancellationToken);
        return updated ? NoContent() : NotFound();
    }
}
