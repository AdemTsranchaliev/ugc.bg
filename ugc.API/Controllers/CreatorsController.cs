using Microsoft.AspNetCore.Mvc;
using ugc.API.Dtos;
using ugc.API.Models;
using ugc.API.Services;

namespace ugc.API.Controllers;

[ApiController]
[Route("api/creators")]
public sealed class CreatorsController : ControllerBase
{
    private readonly IProfileService _service;
    private readonly IReviewService _reviewService;

    public CreatorsController(IProfileService service, IReviewService reviewService)
    {
        _service = service;
        _reviewService = reviewService;
    }

    [Microsoft.AspNetCore.Authorization.AllowAnonymous]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<CreatorProfile>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var profile = await _service.GetCreatorAsync(id, cancellationToken);
        if (profile is null)
        {
            return NotFound();
        }

        return Ok(profile);
    }

    [Microsoft.AspNetCore.Authorization.AllowAnonymous]
    [HttpGet("{id:guid}/reviews")]
    public async Task<ActionResult<IReadOnlyList<Review>>> GetReviews(Guid id, CancellationToken cancellationToken)
    {
        var reviews = await _reviewService.GetByCreatorAsync(id, cancellationToken);
        return Ok(reviews);
    }

    [Microsoft.AspNetCore.Authorization.Authorize(ugc.API.Auth.AuthConstants.UserPolicy)]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<CreatorProfile>> Upsert(Guid id, [FromBody] CreatorProfileUpsertDto dto, CancellationToken cancellationToken)
    {
        var profile = new CreatorProfile
        {
            DisplayName = dto.DisplayName,
            Bio = dto.Bio,
            Location = dto.Location,
            Languages = dto.Languages,
            RateMin = dto.RateMin,
            RateMax = dto.RateMax,
            SocialTiktok = dto.SocialTiktok,
            SocialInstagram = dto.SocialInstagram,
            SocialYoutube = dto.SocialYoutube,
            Website = dto.Website,
            VerifiedCreator = dto.VerifiedCreator,
            RatingAvg = dto.RatingAvg,
            RatingCount = dto.RatingCount,
            PortfolioCount = dto.PortfolioCount,
            AiCreator = dto.AiCreator
        };

        var saved = await _service.UpsertCreatorAsync(id, profile, cancellationToken);
        return Ok(saved);
    }
}
