using System.ComponentModel.DataAnnotations;

namespace ugc.API.Models;

public sealed class Category
{
    public int Id { get; set; }

    [MaxLength(100)]
    public string Slug { get; set; } = string.Empty;

    [MaxLength(120)]
    public string NameBg { get; set; } = string.Empty;

    [MaxLength(120)]
    public string NameEn { get; set; } = string.Empty;

    public ICollection<Listing> Listings { get; set; } = new List<Listing>();
}
