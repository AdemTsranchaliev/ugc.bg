using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ugc.API.Models;

namespace ugc.API.Data;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(IServiceProvider services, CancellationToken cancellationToken = default)
    {
        using var scope = services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<UgcDbContext>();
        var passwordHasher = scope.ServiceProvider.GetRequiredService<PasswordHasher<User>>();
        var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();

        await context.Database.MigrateAsync(cancellationToken);

        await SeedCategoriesAsync(context, cancellationToken);
        await SeedPlansAsync(context, cancellationToken);
        await SeedUsersAsync(context, passwordHasher, configuration, cancellationToken);
        await SeedListingsAsync(context, cancellationToken);
    }

    private static async Task SeedCategoriesAsync(UgcDbContext context, CancellationToken cancellationToken)
    {
        if (await context.Categories.AnyAsync(cancellationToken))
        {
            return;
        }

        var categories = new[]
        {
            new Category { Slug = "video-ugc", NameBg = "Видео UGC", NameEn = "Video UGC" },
            new Category { Slug = "photo-ugc", NameBg = "Фото UGC", NameEn = "Photo UGC" },
            new Category { Slug = "unboxing-demo", NameBg = "Unboxing и демо", NameEn = "Unboxing & Demo" },
            new Category { Slug = "micro-influencers", NameBg = "Микро инфлуенсъри", NameEn = "Micro-influencers" },
            new Category { Slug = "voice-script", NameBg = "Voice & Script", NameEn = "Voice & Script" },
            new Category { Slug = "editing", NameBg = "Editing", NameEn = "Editing" }
        };

        context.Categories.AddRange(categories);
        await context.SaveChangesAsync(cancellationToken);
    }

    private static async Task SeedPlansAsync(UgcDbContext context, CancellationToken cancellationToken)
    {
        if (await context.Plans.AnyAsync(cancellationToken))
        {
            return;
        }

        context.Plans.AddRange(
            new Plan
            {
                Id = Guid.NewGuid(),
                Code = "free",
                Name = "Free",
                PriceMonth = 0,
                Currency = Currency.Bgn,
                ListingsLimit = 3,
                IncludedBoosts = 0,
                PriorityLevel = 1
            },
            new Plan
            {
                Id = Guid.NewGuid(),
                Code = "pro",
                Name = "Pro",
                PriceMonth = 49,
                Currency = Currency.Bgn,
                ListingsLimit = 20,
                IncludedBoosts = 2,
                PriorityLevel = 2
            });

        await context.SaveChangesAsync(cancellationToken);
    }

    private static async Task SeedUsersAsync(
        UgcDbContext context,
        PasswordHasher<User> passwordHasher,
        IConfiguration configuration,
        CancellationToken cancellationToken)
    {
        var adminEmail = configuration["Seed:AdminEmail"] ?? "admin@ugc.bg";
        var adminPassword = configuration["Seed:AdminPassword"] ?? "Admin123!";

        if (!await context.Users.AnyAsync(u => u.Email == adminEmail, cancellationToken))
        {
            var admin = new User
            {
                Id = Guid.NewGuid(),
                Email = adminEmail,
                Role = UserRole.Admin,
                Status = UserStatus.Active,
                IsEmailVerified = true,
                CreatedAt = DateTimeOffset.UtcNow
            };

            admin.PasswordHash = passwordHasher.HashPassword(admin, adminPassword);
            context.Users.Add(admin);
        }

        var creatorEmail = configuration["Seed:CreatorEmail"] ?? "creator@ugc.bg";
        var creatorPassword = configuration["Seed:CreatorPassword"] ?? "Creator123!";

        if (!await context.Users.AnyAsync(u => u.Email == creatorEmail, cancellationToken))
        {
            var creator = new User
            {
                Id = Guid.NewGuid(),
                Email = creatorEmail,
                Role = UserRole.Creator,
                Status = UserStatus.Active,
                IsEmailVerified = true,
                CreatedAt = DateTimeOffset.UtcNow
            };

            creator.PasswordHash = passwordHasher.HashPassword(creator, creatorPassword);
            context.Users.Add(creator);

            context.CreatorProfiles.Add(new CreatorProfile
            {
                UserId = creator.Id,
                DisplayName = "Demo Creator",
                Bio = "Demo creator profile for testing.",
                Location = "Sofia",
                Languages = new List<string> { "bg", "en" },
                RateMin = 50,
                RateMax = 200,
                SocialInstagram = "https://instagram.com/demo",
                VerifiedCreator = true,
                RatingAvg = 4.8m,
                RatingCount = 12,
                PortfolioCount = 6,
                AiCreator = false
            });
        }

        var businessEmail = configuration["Seed:BusinessEmail"] ?? "business@ugc.bg";
        var businessPassword = configuration["Seed:BusinessPassword"] ?? "Business123!";

        if (!await context.Users.AnyAsync(u => u.Email == businessEmail, cancellationToken))
        {
            var business = new User
            {
                Id = Guid.NewGuid(),
                Email = businessEmail,
                Role = UserRole.Business,
                Status = UserStatus.Active,
                IsEmailVerified = true,
                CreatedAt = DateTimeOffset.UtcNow
            };

            business.PasswordHash = passwordHasher.HashPassword(business, businessPassword);
            context.Users.Add(business);

            context.BusinessProfiles.Add(new BusinessProfile
            {
                UserId = business.Id,
                CompanyName = "Demo Business Ltd",
                CompanyNumber = "BG123456789",
                Website = "https://example.com",
                Industry = "Ecommerce",
                VerifiedBusiness = true
            });
        }

        await context.SaveChangesAsync(cancellationToken);
    }

    private static async Task SeedListingsAsync(UgcDbContext context, CancellationToken cancellationToken)
    {
        if (await context.Listings.AnyAsync(cancellationToken))
        {
            return;
        }

        var creator = await context.Users.FirstOrDefaultAsync(u => u.Role == UserRole.Creator, cancellationToken);
        var category = await context.Categories.FirstOrDefaultAsync(cancellationToken);

        if (creator is null || category is null)
        {
            return;
        }

        var listing = new Listing
        {
            Id = Guid.NewGuid(),
            CreatorId = creator.Id,
            CategoryId = category.Id,
            Title = "UGC видео за козметика",
            Description = "Примерна обява за тестове.",
            PriceFrom = 80,
            PriceTo = 150,
            Currency = Currency.Bgn,
            Status = ListingStatus.Active,
            CreatedAt = DateTimeOffset.UtcNow,
            ExpiresAt = DateTimeOffset.UtcNow.AddDays(30)
        };

        context.Listings.Add(listing);
        context.ListingMedia.Add(new ListingMedia
        {
            Id = Guid.NewGuid(),
            ListingId = listing.Id,
            Type = ListingMediaType.Image,
            Url = "https://picsum.photos/800/600",
            Position = 0
        });

        await context.SaveChangesAsync(cancellationToken);
    }
}
