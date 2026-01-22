using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ugc.API.Dtos;
using ugc.API.Services;

namespace ugc.API.Controllers;

[ApiController]
[Route("api/home")]
public sealed class HomeController : ControllerBase
{
    private readonly IHomeService _homeService;

    public HomeController(IHomeService homeService)
    {
        _homeService = homeService;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<HomeResponse>> Get(CancellationToken cancellationToken)
    {
        var data = await _homeService.GetHomeAsync(cancellationToken);
        return Ok(data);
    }
}
