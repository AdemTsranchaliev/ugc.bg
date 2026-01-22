using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ugc.API.Dtos;
using ugc.API.Services;

namespace ugc.API.Controllers;

[ApiController]
[Route("api/search")]
public sealed class SearchController : ControllerBase
{
    private readonly ISearchService _searchService;

    public SearchController(ISearchService searchService)
    {
        _searchService = searchService;
    }

    [AllowAnonymous]
    [HttpGet("suggest")]
    public async Task<ActionResult<SearchSuggestResponse>> Suggest([FromQuery] string q, CancellationToken cancellationToken)
    {
        var suggestions = await _searchService.SuggestAsync(q, cancellationToken);
        return Ok(new SearchSuggestResponse { Suggestions = suggestions });
    }

    [AllowAnonymous]
    [HttpGet("facets")]
    public async Task<ActionResult<IReadOnlyList<string>>> Facets(CancellationToken cancellationToken)
    {
        var facets = await _searchService.FacetsAsync(cancellationToken);
        return Ok(facets);
    }
}
