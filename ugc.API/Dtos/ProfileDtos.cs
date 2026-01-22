namespace ugc.API.Dtos;

public sealed class CreatorProfileUpsertDto
{
    public string DisplayName { get; set; } = string.Empty;
    public string? Bio { get; set; }
    public string? Location { get; set; }
    public List<string> Languages { get; set; } = new();
    public decimal? RateMin { get; set; }
    public decimal? RateMax { get; set; }
    public string? SocialTiktok { get; set; }
    public string? SocialInstagram { get; set; }
    public string? SocialYoutube { get; set; }
    public string? Website { get; set; }
    public bool VerifiedCreator { get; set; }
    public decimal? RatingAvg { get; set; }
    public int RatingCount { get; set; }
    public int PortfolioCount { get; set; }
    public bool AiCreator { get; set; }
}

public sealed class BusinessProfileUpsertDto
{
    public string CompanyName { get; set; } = string.Empty;
    public string? CompanyNumber { get; set; }
    public string? Website { get; set; }
    public string? Industry { get; set; }
    public bool VerifiedBusiness { get; set; }
}
