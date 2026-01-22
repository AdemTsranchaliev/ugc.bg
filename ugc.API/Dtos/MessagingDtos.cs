using System.Text.Json;

namespace ugc.API.Dtos;

public sealed class ConversationCreateRequest
{
    public Guid ParticipantId { get; set; }
    public Guid? ProjectBriefId { get; set; }
}

public sealed class MessageCreateRequest
{
    public string Content { get; set; } = string.Empty;
    public JsonDocument? Attachments { get; set; }
}

public sealed class ReadReceiptRequest
{
    public DateTimeOffset? LastReadAt { get; set; }
}
