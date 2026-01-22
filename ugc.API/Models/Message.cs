using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace ugc.API.Models;

public sealed class Message
{
    public Guid Id { get; set; }

    public Guid ConversationId { get; set; }

    public Guid SenderId { get; set; }

    [MaxLength(4000)]
    public string Content { get; set; } = string.Empty;

    public JsonDocument? Attachments { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset? EditedAt { get; set; }

    public Conversation Conversation { get; set; } = null!;

    public User Sender { get; set; } = null!;
}
