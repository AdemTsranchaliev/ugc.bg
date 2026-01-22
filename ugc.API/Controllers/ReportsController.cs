using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ugc.API.Auth;
using ugc.API.Dtos;
using ugc.API.Models;
using ugc.API.Services;

namespace ugc.API.Controllers;

[ApiController]
[Route("api/reports")]
public sealed class ReportsController : ControllerBase
{
    private readonly IReportService _reportService;

    public ReportsController(IReportService reportService)
    {
        _reportService = reportService;
    }

    [Authorize(AuthConstants.UserPolicy)]
    [HttpPost]
    public async Task<ActionResult<Report>> Create([FromBody] ReportCreateRequest request, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized();
        }

        var report = new Report
        {
            ReportedEntity = request.ReportedEntity,
            EntityId = request.EntityId,
            Reason = request.Reason
        };

        var created = await _reportService.CreateAsync(userId, report, cancellationToken);
        return Ok(created);
    }

    [Authorize(AuthConstants.AdminPolicy)]
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Report>>> GetAll(CancellationToken cancellationToken)
    {
        var reports = await _reportService.GetOpenAsync(cancellationToken);
        return Ok(reports);
    }

    [Authorize(AuthConstants.AdminPolicy)]
    [HttpPost("{id:guid}/resolve")]
    public async Task<IActionResult> Resolve(Guid id, CancellationToken cancellationToken)
    {
        var resolved = await _reportService.ResolveAsync(id, ReportStatus.Resolved, cancellationToken);
        return resolved ? NoContent() : NotFound();
    }
}
