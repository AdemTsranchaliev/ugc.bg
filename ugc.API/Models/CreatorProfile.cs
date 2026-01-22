using System.ComponentModel.DataAnnotations;

namespace ugc.API.Models;

public sealed class CreatorProfile
{
    public Guid UserId { get; set; }

    [MaxLength(120)]
    public string DisplayName { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string? Bio { get; set; }

    [MaxLength(128)]
    public string? Location { get; set; }

    public List<string> Languages { get; set; } = new();

    public decimal? RateMin { get; set; }

    public decimal? RateMax { get; set; }

    [MaxLength(2048)]
    public string? SocialTiktok { get; set; }

    [MaxLength(2048)]
    public string? SocialInstagram { get; set; }

    [MaxLength(2048)]
    public string? SocialYoutube { get; set; }

    [MaxLength(2048)]
    public string? Website { get; set; }

    public bool VerifiedCreator { get; set; }

    public decimal? RatingAvg { get; set; }

    public int RatingCount { get; set; }

    public int PortfolioCount { get; set; }

    public bool AiCreator { get; set; }

    public User User { get; set; } = null!;
}
