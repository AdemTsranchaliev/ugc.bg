namespace ugc.API.Auth;

public sealed class AuthOptions
{
    public const string SectionName = "Auth";

    public string Issuer { get; set; } = "ugc.API";
    public string Audience { get; set; } = "ugc.API";
    public string SigningKey { get; set; } = string.Empty;
    public int TokenMinutes { get; set; } = 120;
}
