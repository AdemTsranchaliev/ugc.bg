using System.ComponentModel.DataAnnotations;

namespace ugc.API.Models;

public sealed class User
{
    public Guid Id { get; set; }

    [MaxLength(320)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(32)]
    public string? Phone { get; set; }

    public UserRole Role { get; set; }

    [MaxLength(400)]
    public string PasswordHash { get; set; } = string.Empty;

    public bool IsEmailVerified { get; set; }

    public bool IsPhoneVerified { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset? LastLoginAt { get; set; }

    public UserStatus Status { get; set; }

    public CreatorProfile? CreatorProfile { get; set; }

    public BusinessProfile? BusinessProfile { get; set; }

    public ICollection<Listing> Listings { get; set; } = new List<Listing>();

    public ICollection<Conversation> Conversations { get; set; } = new List<Conversation>();

    public ICollection<ConversationMember> ConversationMemberships { get; set; } = new List<ConversationMember>();

    public ICollection<Message> MessagesSent { get; set; } = new List<Message>();

    public ICollection<Review> ReviewsWritten { get; set; } = new List<Review>();

    public ICollection<Review> ReviewsReceived { get; set; } = new List<Review>();

    public ICollection<ProjectBrief> ProjectBriefs { get; set; } = new List<ProjectBrief>();

    public ICollection<BriefApplication> BriefApplications { get; set; } = new List<BriefApplication>();

    public ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();

    public ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public ICollection<Report> Reports { get; set; } = new List<Report>();

    public ICollection<AuditLog> AuditLogs { get; set; } = new List<AuditLog>();

    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}
