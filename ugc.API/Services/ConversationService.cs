using Microsoft.EntityFrameworkCore;
using ugc.API.Data;
using ugc.API.Models;
using ugc.API.Repositories;

namespace ugc.API.Services;

public interface IConversationService
{
    Task<IReadOnlyList<Conversation>> GetForUserAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<Conversation> CreateAsync(Guid userId, Guid participantId, Guid? projectBriefId, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<Message>> GetMessagesAsync(Guid conversationId, CancellationToken cancellationToken = default);
    Task<Message> AddMessageAsync(Guid conversationId, Guid senderId, string content, System.Text.Json.JsonDocument? attachments, CancellationToken cancellationToken = default);
    Task MarkReadAsync(Guid conversationId, Guid userId, DateTimeOffset? lastReadAt, CancellationToken cancellationToken = default);
}

public sealed class ConversationService : IConversationService
{
    private readonly UgcDbContext _dbContext;
    private readonly IRepository<Conversation> _conversationRepository;
    private readonly IRepository<Message> _messageRepository;
    private readonly IRepository<MessageRead> _readRepository;

    public ConversationService(
        UgcDbContext dbContext,
        IRepository<Conversation> conversationRepository,
        IRepository<Message> messageRepository,
        IRepository<MessageRead> readRepository)
    {
        _dbContext = dbContext;
        _conversationRepository = conversationRepository;
        _messageRepository = messageRepository;
        _readRepository = readRepository;
    }

    public async Task<IReadOnlyList<Conversation>> GetForUserAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return await _dbContext.Conversations
            .AsNoTracking()
            .Include(c => c.Members)
            .Include(c => c.Messages.OrderByDescending(m => m.CreatedAt))
            .Where(c => c.Members.Any(m => m.UserId == userId))
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<Conversation> CreateAsync(
        Guid userId,
        Guid participantId,
        Guid? projectBriefId,
        CancellationToken cancellationToken = default)
    {
        var conversation = new Conversation
        {
            Id = Guid.NewGuid(),
            CreatedBy = userId,
            CreatedAt = DateTimeOffset.UtcNow,
            ProjectBriefId = projectBriefId
        };

        _dbContext.Conversations.Add(conversation);
        _dbContext.ConversationMembers.AddRange(
            new ConversationMember
            {
                ConversationId = conversation.Id,
                UserId = userId,
                JoinedAt = DateTimeOffset.UtcNow
            },
            new ConversationMember
            {
                ConversationId = conversation.Id,
                UserId = participantId,
                JoinedAt = DateTimeOffset.UtcNow
            });

        await _dbContext.SaveChangesAsync(cancellationToken);
        return conversation;
    }

    public async Task<IReadOnlyList<Message>> GetMessagesAsync(Guid conversationId, CancellationToken cancellationToken = default)
    {
        return await _dbContext.Messages
            .AsNoTracking()
            .Where(m => m.ConversationId == conversationId)
            .OrderBy(m => m.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<Message> AddMessageAsync(
        Guid conversationId,
        Guid senderId,
        string content,
        System.Text.Json.JsonDocument? attachments,
        CancellationToken cancellationToken = default)
    {
        var message = new Message
        {
            Id = Guid.NewGuid(),
            ConversationId = conversationId,
            SenderId = senderId,
            Content = content,
            Attachments = attachments,
            CreatedAt = DateTimeOffset.UtcNow
        };

        return await _messageRepository.AddAsync(message, cancellationToken);
    }

    public async Task MarkReadAsync(
        Guid conversationId,
        Guid userId,
        DateTimeOffset? lastReadAt,
        CancellationToken cancellationToken = default)
    {
        var existing = await _dbContext.MessageReads
            .FirstOrDefaultAsync(r => r.ConversationId == conversationId && r.UserId == userId, cancellationToken);

        if (existing is null)
        {
            await _readRepository.AddAsync(new MessageRead
            {
                ConversationId = conversationId,
                UserId = userId,
                LastReadAt = lastReadAt ?? DateTimeOffset.UtcNow
            }, cancellationToken);
            return;
        }

        existing.LastReadAt = lastReadAt ?? DateTimeOffset.UtcNow;
        await _readRepository.UpdateAsync(existing, cancellationToken);
    }
}
