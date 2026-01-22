using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ugc.API.Auth;
using ugc.API.Dtos;
using ugc.API.Models;
using ugc.API.Services;

namespace ugc.API.Controllers;

[ApiController]
[Route("api/conversations")]
public sealed class ConversationsController : ControllerBase
{
    private readonly IConversationService _service;

    public ConversationsController(IConversationService service)
    {
        _service = service;
    }

    [Authorize(AuthConstants.UserPolicy)]
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Conversation>>> GetAll(CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized();
        }

        var conversations = await _service.GetForUserAsync(userId, cancellationToken);
        return Ok(conversations);
    }

    [Authorize(AuthConstants.UserPolicy)]
    [HttpPost]
    public async Task<ActionResult<Conversation>> Create([FromBody] ConversationCreateRequest request, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized();
        }

        var created = await _service.CreateAsync(userId, request.ParticipantId, request.ProjectBriefId, cancellationToken);
        return Ok(created);
    }

    [Authorize(AuthConstants.UserPolicy)]
    [HttpGet("{id:guid}/messages")]
    public async Task<ActionResult<IReadOnlyList<Message>>> GetMessages(Guid id, CancellationToken cancellationToken)
    {
        var messages = await _service.GetMessagesAsync(id, cancellationToken);
        return Ok(messages);
    }

    [Authorize(AuthConstants.UserPolicy)]
    [HttpPost("{id:guid}/messages")]
    public async Task<ActionResult<Message>> SendMessage(Guid id, [FromBody] MessageCreateRequest request, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized();
        }

        var message = await _service.AddMessageAsync(id, userId, request.Content, request.Attachments, cancellationToken);
        return Ok(message);
    }

    [Authorize(AuthConstants.UserPolicy)]
    [HttpPost("{id:guid}/read-receipts")]
    public async Task<IActionResult> ReadReceipts(Guid id, [FromBody] ReadReceiptRequest request, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized();
        }

        await _service.MarkReadAsync(id, userId, request.LastReadAt, cancellationToken);
        return NoContent();
    }
}
