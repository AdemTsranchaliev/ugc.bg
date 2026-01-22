using Microsoft.AspNetCore.Mvc;

namespace ugc.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class StatusController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            status = "ok",
            service = "ugc.API"
        });
    }
}
