namespace ugc.API.Models;

public sealed class ConversationMember
{
    public Guid ConversationId { get; set; }

    public Guid UserId { get; set; }

    public DateTimeOffset JoinedAt { get; set; }

    public Conversation Conversation { get; set; } = null!;

    public User User { get; set; } = null!;
}
