using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ugc.API.Dtos;

namespace ugc.API.Controllers;

[ApiController]
[Route("api/public")]
public sealed class PublicController : ControllerBase
{
    [AllowAnonymous]
    [HttpGet("about")]
    public ActionResult<PublicPageResponse> About()
    {
        return Ok(new PublicPageResponse
        {
            Content = "About content placeholder."
        });
    }

    [AllowAnonymous]
    [HttpGet("faq")]
    public ActionResult<PublicPageResponse> Faq()
    {
        return Ok(new PublicPageResponse
        {
            Content = "FAQ content placeholder."
        });
    }

    [AllowAnonymous]
    [HttpPost("contact")]
    public IActionResult Contact([FromBody] ContactRequest request)
    {
        return Accepted();
    }
}
