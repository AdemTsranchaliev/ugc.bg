using Microsoft.AspNetCore.Mvc;
using ugc.API.Dtos;
using ugc.API.Models;
using ugc.API.Services;

namespace ugc.API.Controllers;

[ApiController]
[Route("api/businesses")]
public sealed class BusinessesController : ControllerBase
{
    private readonly IProfileService _service;

    public BusinessesController(IProfileService service)
    {
        _service = service;
    }

    [Microsoft.AspNetCore.Authorization.AllowAnonymous]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<BusinessProfile>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var profile = await _service.GetBusinessAsync(id, cancellationToken);
        if (profile is null)
        {
            return NotFound();
        }

        return Ok(profile);
    }

    [Microsoft.AspNetCore.Authorization.Authorize(ugc.API.Auth.AuthConstants.UserPolicy)]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<BusinessProfile>> Upsert(Guid id, [FromBody] BusinessProfileUpsertDto dto, CancellationToken cancellationToken)
    {
        var profile = new BusinessProfile
        {
            CompanyName = dto.CompanyName,
            CompanyNumber = dto.CompanyNumber,
            Website = dto.Website,
            Industry = dto.Industry,
            VerifiedBusiness = dto.VerifiedBusiness
        };

        var saved = await _service.UpsertBusinessAsync(id, profile, cancellationToken);
        return Ok(saved);
    }
}
