using System.ComponentModel.DataAnnotations;

namespace ugc.API.Models;

public sealed class BusinessProfile
{
    public Guid UserId { get; set; }

    [MaxLength(200)]
    public string CompanyName { get; set; } = string.Empty;

    [MaxLength(64)]
    public string? CompanyNumber { get; set; }

    [MaxLength(2048)]
    public string? Website { get; set; }

    [MaxLength(120)]
    public string? Industry { get; set; }

    public bool VerifiedBusiness { get; set; }

    public User User { get; set; } = null!;
}
