namespace ugc.API.Dtos;

public sealed class CategoryUpsertDto
{
    public string Slug { get; set; } = string.Empty;
    public string NameBg { get; set; } = string.Empty;
    public string NameEn { get; set; } = string.Empty;
}
