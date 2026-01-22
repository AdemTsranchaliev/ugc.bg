using Microsoft.AspNetCore.Mvc;
using ugc.API.Dtos;
using ugc.API.Models;
using ugc.API.Services;

namespace ugc.API.Controllers;

[ApiController]
[Route("api/listings")]
public sealed class ListingsController : ControllerBase
{
    private readonly IListingService _service;
    private readonly IListingMediaService _mediaService;

    public ListingsController(IListingService service, IListingMediaService mediaService)
    {
        _service = service;
        _mediaService = mediaService;
    }

    [Microsoft.AspNetCore.Authorization.AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Listing>>> Search([FromQuery] ListingSearchQuery query, CancellationToken cancellationToken)
    {
        var listings = await _service.SearchAsync(
            query.Q,
            query.CategoryId,
            query.PriceMin,
            query.PriceMax,
            query.Location,
            query.Language,
            query.Verified,
            query.AiCreator,
            query.Sort,
            cancellationToken);

        return Ok(listings);
    }

    [Microsoft.AspNetCore.Authorization.AllowAnonymous]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Listing>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var listing = await _service.GetByIdAsync(id, cancellationToken);
        if (listing is null)
        {
            return NotFound();
        }

        return Ok(listing);
    }

    [Microsoft.AspNetCore.Authorization.Authorize(ugc.API.Auth.AuthConstants.UserPolicy)]
    [HttpPost]
    public async Task<ActionResult<Listing>> Create([FromBody] ListingUpsertDto dto, CancellationToken cancellationToken)
    {
        var listing = new Listing
        {
            CreatorId = dto.CreatorId,
            CategoryId = dto.CategoryId,
            Title = dto.Title,
            Description = dto.Description,
            PriceFrom = dto.PriceFrom,
            PriceTo = dto.PriceTo,
            Currency = dto.Currency,
            Status = dto.Status,
            ExpiresAt = dto.ExpiresAt,
            FeaturedUntil = dto.FeaturedUntil
        };

        var created = await _service.CreateAsync(listing, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [Microsoft.AspNetCore.Authorization.Authorize(ugc.API.Auth.AuthConstants.UserPolicy)]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] ListingUpsertDto dto, CancellationToken cancellationToken)
    {
        var updated = await _service.UpdateAsync(new Listing
        {
            Id = id,
            CreatorId = dto.CreatorId,
            CategoryId = dto.CategoryId,
            Title = dto.Title,
            Description = dto.Description,
            PriceFrom = dto.PriceFrom,
            PriceTo = dto.PriceTo,
            Currency = dto.Currency,
            Status = dto.Status,
            ExpiresAt = dto.ExpiresAt,
            FeaturedUntil = dto.FeaturedUntil
        }, cancellationToken);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [Microsoft.AspNetCore.Authorization.Authorize(ugc.API.Auth.AuthConstants.UserPolicy)]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _service.DeleteAsync(id, cancellationToken);
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    [Microsoft.AspNetCore.Authorization.Authorize(ugc.API.Auth.AuthConstants.UserPolicy)]
    [HttpPost("{id:guid}/renew")]
    public async Task<IActionResult> Renew(Guid id, CancellationToken cancellationToken)
    {
        var renewed = await _service.RenewAsync(id, cancellationToken);
        if (!renewed)
        {
            return NotFound();
        }

        return NoContent();
    }

    [Microsoft.AspNetCore.Authorization.AllowAnonymous]
    [HttpGet("{id:guid}/media")]
    public async Task<ActionResult<IReadOnlyList<ListingMedia>>> GetMedia(Guid id, CancellationToken cancellationToken)
    {
        var media = await _mediaService.GetForListingAsync(id, cancellationToken);
        return Ok(media.OrderBy(m => m.Position));
    }

    [Microsoft.AspNetCore.Authorization.Authorize(ugc.API.Auth.AuthConstants.UserPolicy)]
    [HttpPost("{id:guid}/media")]
    public async Task<ActionResult<ListingMedia>> AddMedia(Guid id, [FromBody] ugc.API.Dtos.ListingMediaCreateRequest request, CancellationToken cancellationToken)
    {
        var media = new ListingMedia
        {
            Type = request.Type,
            Url = request.Url,
            ThumbUrl = request.ThumbUrl,
            Position = request.Position
        };

        var created = await _mediaService.AddAsync(id, media, cancellationToken);
        return Ok(created);
    }

    [Microsoft.AspNetCore.Authorization.Authorize(ugc.API.Auth.AuthConstants.UserPolicy)]
    [HttpDelete("{id:guid}/media/{mediaId:guid}")]
    public async Task<IActionResult> DeleteMedia(Guid id, Guid mediaId, CancellationToken cancellationToken)
    {
        var deleted = await _mediaService.DeleteAsync(mediaId, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
