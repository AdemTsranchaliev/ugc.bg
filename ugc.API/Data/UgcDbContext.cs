using Microsoft.EntityFrameworkCore;
using ugc.API.Models;

namespace ugc.API.Data;

public sealed class UgcDbContext : DbContext
{
    public UgcDbContext(DbContextOptions<UgcDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<CreatorProfile> CreatorProfiles => Set<CreatorProfile>();
    public DbSet<BusinessProfile> BusinessProfiles => Set<BusinessProfile>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Listing> Listings => Set<Listing>();
    public DbSet<ListingMedia> ListingMedia => Set<ListingMedia>();
    public DbSet<Conversation> Conversations => Set<Conversation>();
    public DbSet<ConversationMember> ConversationMembers => Set<ConversationMember>();
    public DbSet<Message> Messages => Set<Message>();
    public DbSet<MessageRead> MessageReads => Set<MessageRead>();
    public DbSet<Review> Reviews => Set<Review>();
    public DbSet<ProjectBrief> ProjectBriefs => Set<ProjectBrief>();
    public DbSet<BriefApplication> BriefApplications => Set<BriefApplication>();
    public DbSet<Plan> Plans => Set<Plan>();
    public DbSet<Subscription> Subscriptions => Set<Subscription>();
    public DbSet<Boost> Boosts => Set<Boost>();
    public DbSet<Payment> Payments => Set<Payment>();
    public DbSet<Report> Reports => Set<Report>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
    public DbSet<EmailVerificationToken> EmailVerificationTokens => Set<EmailVerificationToken>();
    public DbSet<PhoneVerificationToken> PhoneVerificationTokens => Set<PhoneVerificationToken>();
    public DbSet<PasswordResetToken> PasswordResetTokens => Set<PasswordResetToken>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("pg_trgm");

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");
            entity.HasKey(u => u.Id);
            entity.HasIndex(u => u.Email).IsUnique();
            entity.HasIndex(u => u.Role);
            entity.HasIndex(u => u.Status);
            entity.Property(u => u.Role).HasConversion<string>().HasMaxLength(16);
            entity.Property(u => u.Status).HasConversion<string>().HasMaxLength(16);
        });

        modelBuilder.Entity<CreatorProfile>(entity =>
        {
            entity.ToTable("creator_profiles");
            entity.HasKey(p => p.UserId);
            entity.HasIndex(p => p.Location);
            entity.HasIndex(p => p.RatingAvg);
            entity.HasIndex(p => p.Languages).HasMethod("gin");
            entity.Property(p => p.Languages).HasColumnType("jsonb");
            entity.Property(p => p.RateMin).HasPrecision(18, 2);
            entity.Property(p => p.RateMax).HasPrecision(18, 2);
            entity.HasOne(p => p.User)
                .WithOne(u => u.CreatorProfile)
                .HasForeignKey<CreatorProfile>(p => p.UserId);
        });

        modelBuilder.Entity<BusinessProfile>(entity =>
        {
            entity.ToTable("business_profiles");
            entity.HasKey(p => p.UserId);
            entity.HasIndex(p => p.CompanyName);
            entity.HasIndex(p => p.VerifiedBusiness);
            entity.HasOne(p => p.User)
                .WithOne(u => u.BusinessProfile)
                .HasForeignKey<BusinessProfile>(p => p.UserId);
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("categories");
            entity.HasKey(c => c.Id);
            entity.HasIndex(c => c.Slug).IsUnique();
        });

        modelBuilder.Entity<Listing>(entity =>
        {
            entity.ToTable("listings");
            entity.HasKey(l => l.Id);
            entity.HasIndex(l => l.CategoryId);
            entity.HasIndex(l => l.Status);
            entity.HasIndex(l => l.ExpiresAt);
            entity.HasIndex(l => new { l.Status, l.CategoryId, l.FeaturedUntil, l.CreatedAt });
            entity.HasIndex(l => l.Title).HasMethod("gin").HasOperators("gin_trgm_ops");
            entity.HasIndex(l => l.Description).HasMethod("gin").HasOperators("gin_trgm_ops");
            entity.Property(l => l.Status).HasConversion<string>().HasMaxLength(16);
            entity.Property(l => l.Currency).HasConversion<string>().HasMaxLength(8);
            entity.Property(l => l.PriceFrom).HasPrecision(18, 2);
            entity.Property(l => l.PriceTo).HasPrecision(18, 2);
            entity.HasOne(l => l.Creator)
                .WithMany(u => u.Listings)
                .HasForeignKey(l => l.CreatorId);
            entity.HasOne(l => l.Category)
                .WithMany(c => c.Listings)
                .HasForeignKey(l => l.CategoryId);
        });

        modelBuilder.Entity<ListingMedia>(entity =>
        {
            entity.ToTable("listing_media");
            entity.HasKey(m => m.Id);
            entity.HasIndex(m => m.ListingId);
            entity.HasIndex(m => m.Type);
            entity.HasIndex(m => m.Position);
            entity.Property(m => m.Type).HasConversion<string>().HasMaxLength(16);
            entity.HasOne(m => m.Listing)
                .WithMany(l => l.Media)
                .HasForeignKey(m => m.ListingId);
        });

        modelBuilder.Entity<Conversation>(entity =>
        {
            entity.ToTable("conversations");
            entity.HasKey(c => c.Id);
            entity.HasIndex(c => c.CreatedAt);
            entity.HasOne(c => c.Creator)
                .WithMany(u => u.Conversations)
                .HasForeignKey(c => c.CreatedBy);
            entity.HasOne(c => c.ProjectBrief)
                .WithMany(b => b.Conversations)
                .HasForeignKey(c => c.ProjectBriefId);
        });

        modelBuilder.Entity<ConversationMember>(entity =>
        {
            entity.ToTable("conversation_members");
            entity.HasKey(m => new { m.ConversationId, m.UserId });
            entity.HasOne(m => m.Conversation)
                .WithMany(c => c.Members)
                .HasForeignKey(m => m.ConversationId);
            entity.HasOne(m => m.User)
                .WithMany(u => u.ConversationMemberships)
                .HasForeignKey(m => m.UserId);
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.ToTable("messages");
            entity.HasKey(m => m.Id);
            entity.HasIndex(m => new { m.ConversationId, m.CreatedAt });
            entity.Property(m => m.Attachments).HasColumnType("jsonb");
            entity.HasOne(m => m.Conversation)
                .WithMany(c => c.Messages)
                .HasForeignKey(m => m.ConversationId);
            entity.HasOne(m => m.Sender)
                .WithMany(u => u.MessagesSent)
                .HasForeignKey(m => m.SenderId);
        });

        modelBuilder.Entity<MessageRead>(entity =>
        {
            entity.ToTable("message_reads");
            entity.HasKey(r => new { r.ConversationId, r.UserId });
            entity.HasOne(r => r.Conversation)
                .WithMany(c => c.Reads)
                .HasForeignKey(r => r.ConversationId);
            entity.HasOne(r => r.User)
                .WithMany()
                .HasForeignKey(r => r.UserId);
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.ToTable("reviews");
            entity.HasKey(r => r.Id);
            entity.HasIndex(r => r.CreatorId);
            entity.HasIndex(r => r.BusinessId);
            entity.HasIndex(r => r.Status);
            entity.HasIndex(r => r.CreatedAt);
            entity.Property(r => r.Status).HasConversion<string>().HasMaxLength(16);
            entity.HasOne(r => r.Creator)
                .WithMany(u => u.ReviewsReceived)
                .HasForeignKey(r => r.CreatorId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(r => r.Business)
                .WithMany(u => u.ReviewsWritten)
                .HasForeignKey(r => r.BusinessId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<ProjectBrief>(entity =>
        {
            entity.ToTable("project_briefs");
            entity.HasKey(b => b.Id);
            entity.HasIndex(b => b.BusinessId);
            entity.HasIndex(b => b.Type);
            entity.HasIndex(b => b.Niche);
            entity.HasIndex(b => b.Status);
            entity.Property(b => b.Type).HasConversion<string>().HasMaxLength(16);
            entity.Property(b => b.DeliveryPolicy).HasConversion<string>().HasMaxLength(16);
            entity.Property(b => b.Status).HasConversion<string>().HasMaxLength(16);
            entity.Property(b => b.Requirements).HasColumnType("jsonb");
            entity.Property(b => b.Links).HasColumnType("jsonb");
            entity.Property(b => b.BudgetMin).HasPrecision(18, 2);
            entity.Property(b => b.BudgetMax).HasPrecision(18, 2);
            entity.HasOne(b => b.Business)
                .WithMany(u => u.ProjectBriefs)
                .HasForeignKey(b => b.BusinessId);
        });

        modelBuilder.Entity<BriefApplication>(entity =>
        {
            entity.ToTable("brief_applications");
            entity.HasKey(a => a.Id);
            entity.HasIndex(a => a.BriefId);
            entity.HasIndex(a => a.CreatorId);
            entity.HasIndex(a => a.Status);
            entity.Property(a => a.Status).HasConversion<string>().HasMaxLength(16);
            entity.Property(a => a.PriceOffer).HasPrecision(18, 2);
            entity.HasOne(a => a.Brief)
                .WithMany(b => b.Applications)
                .HasForeignKey(a => a.BriefId);
            entity.HasOne(a => a.Creator)
                .WithMany(u => u.BriefApplications)
                .HasForeignKey(a => a.CreatorId);
        });

        modelBuilder.Entity<Plan>(entity =>
        {
            entity.ToTable("plans");
            entity.HasKey(p => p.Id);
            entity.HasIndex(p => p.Code).IsUnique();
            entity.Property(p => p.Currency).HasConversion<string>().HasMaxLength(8);
            entity.Property(p => p.PriceMonth).HasPrecision(18, 2);
        });

        modelBuilder.Entity<Subscription>(entity =>
        {
            entity.ToTable("subscriptions");
            entity.HasKey(s => s.Id);
            entity.HasIndex(s => s.UserId);
            entity.HasIndex(s => s.Status);
            entity.Property(s => s.Provider).HasConversion<string>().HasMaxLength(16);
            entity.Property(s => s.Status).HasConversion<string>().HasMaxLength(16);
            entity.HasOne(s => s.User)
                .WithMany(u => u.Subscriptions)
                .HasForeignKey(s => s.UserId);
            entity.HasOne(s => s.Plan)
                .WithMany(p => p.Subscriptions)
                .HasForeignKey(s => s.PlanCode)
                .HasPrincipalKey(p => p.Code);
        });

        modelBuilder.Entity<Boost>(entity =>
        {
            entity.ToTable("boosts");
            entity.HasKey(b => b.Id);
            entity.HasIndex(b => b.ListingId);
            entity.HasIndex(b => b.EndsAt);
            entity.Property(b => b.Kind).HasConversion<string>().HasMaxLength(16);
            entity.HasOne(b => b.Listing)
                .WithMany(l => l.Boosts)
                .HasForeignKey(b => b.ListingId);
            entity.HasOne(b => b.PaidByUser)
                .WithMany()
                .HasForeignKey(b => b.PaidBy);
            entity.HasOne(b => b.Payment)
                .WithMany(p => p.Boosts)
                .HasForeignKey(b => b.PaymentId);
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.ToTable("payments");
            entity.HasKey(p => p.Id);
            entity.HasIndex(p => p.UserId);
            entity.HasIndex(p => p.Status);
            entity.Property(p => p.Type).HasConversion<string>().HasMaxLength(16);
            entity.Property(p => p.Provider).HasConversion<string>().HasMaxLength(16);
            entity.Property(p => p.Status).HasConversion<string>().HasMaxLength(16);
            entity.Property(p => p.Amount).HasPrecision(18, 2);
            entity.Property(p => p.Currency).HasConversion<string>().HasMaxLength(8);
            entity.HasOne(p => p.User)
                .WithMany(u => u.Payments)
                .HasForeignKey(p => p.UserId);
        });

        modelBuilder.Entity<Report>(entity =>
        {
            entity.ToTable("reports");
            entity.HasKey(r => r.Id);
            entity.HasIndex(r => r.Status);
            entity.Property(r => r.Status).HasConversion<string>().HasMaxLength(16);
            entity.Property(r => r.ReportedEntity).HasConversion<string>().HasMaxLength(16);
            entity.HasOne(r => r.Reporter)
                .WithMany(u => u.Reports)
                .HasForeignKey(r => r.ReporterId);
        });

        modelBuilder.Entity<AuditLog>(entity =>
        {
            entity.ToTable("audit_logs");
            entity.HasKey(a => a.Id);
            entity.Property(a => a.Diff).HasColumnType("jsonb");
            entity.HasOne(a => a.Actor)
                .WithMany(u => u.AuditLogs)
                .HasForeignKey(a => a.ActorId);
        });

        modelBuilder.Entity<EmailVerificationToken>(entity =>
        {
            entity.ToTable("email_verification_tokens");
            entity.HasKey(t => t.Id);
            entity.HasIndex(t => t.UserId);
            entity.HasIndex(t => t.Token);
            entity.HasOne(t => t.User)
                .WithMany()
                .HasForeignKey(t => t.UserId);
        });

        modelBuilder.Entity<PhoneVerificationToken>(entity =>
        {
            entity.ToTable("phone_verification_tokens");
            entity.HasKey(t => t.Id);
            entity.HasIndex(t => t.UserId);
            entity.HasIndex(t => t.Token);
            entity.HasOne(t => t.User)
                .WithMany()
                .HasForeignKey(t => t.UserId);
        });

        modelBuilder.Entity<PasswordResetToken>(entity =>
        {
            entity.ToTable("password_reset_tokens");
            entity.HasKey(t => t.Id);
            entity.HasIndex(t => t.UserId);
            entity.HasIndex(t => t.Token);
            entity.HasOne(t => t.User)
                .WithMany()
                .HasForeignKey(t => t.UserId);
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.ToTable("refresh_tokens");
            entity.HasKey(t => t.Id);
            entity.HasIndex(t => t.UserId);
            entity.HasIndex(t => t.Token).IsUnique();
            entity.HasOne(t => t.User)
                .WithMany(u => u.RefreshTokens)
                .HasForeignKey(t => t.UserId);
        });
    }
}
