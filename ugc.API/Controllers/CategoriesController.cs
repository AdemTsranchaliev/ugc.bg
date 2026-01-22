using Microsoft.AspNetCore.Mvc;
using ugc.API.Dtos;
using ugc.API.Models;
using ugc.API.Services;

namespace ugc.API.Controllers;

[ApiController]
[Route("api/categories")]
[Microsoft.AspNetCore.Authorization.Authorize(ugc.API.Auth.AuthConstants.AdminPolicy)]
public sealed class CategoriesController : ControllerBase
{
    private readonly ICategoryService _service;

    public CategoriesController(ICategoryService service)
    {
        _service = service;
    }

    [Microsoft.AspNetCore.Authorization.AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Category>>> GetAll(CancellationToken cancellationToken)
    {
        var categories = await _service.GetAllAsync(cancellationToken);
        return Ok(categories);
    }

    [Microsoft.AspNetCore.Authorization.AllowAnonymous]
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Category>> GetById(int id, CancellationToken cancellationToken)
    {
        var category = await _service.GetByIdAsync(id, cancellationToken);
        if (category is null)
        {
            return NotFound();
        }

        return Ok(category);
    }

    [HttpPost]
    public async Task<ActionResult<Category>> Create([FromBody] CategoryUpsertDto dto, CancellationToken cancellationToken)
    {
        var category = new Category
        {
            Slug = dto.Slug,
            NameBg = dto.NameBg,
            NameEn = dto.NameEn
        };

        var created = await _service.CreateAsync(category, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] CategoryUpsertDto dto, CancellationToken cancellationToken)
    {
        var updated = await _service.UpdateAsync(new Category
        {
            Id = id,
            Slug = dto.Slug,
            NameBg = dto.NameBg,
            NameEn = dto.NameEn
        }, cancellationToken);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var deleted = await _service.DeleteAsync(id, cancellationToken);
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}
