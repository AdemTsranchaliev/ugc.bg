namespace ugc.API.Models;

public sealed class Conversation
{
    public Guid Id { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public Guid? ProjectBriefId { get; set; }

    public User Creator { get; set; } = null!;

    public ProjectBrief? ProjectBrief { get; set; }

    public ICollection<ConversationMember> Members { get; set; } = new List<ConversationMember>();

    public ICollection<Message> Messages { get; set; } = new List<Message>();

    public ICollection<MessageRead> Reads { get; set; } = new List<MessageRead>();
}
