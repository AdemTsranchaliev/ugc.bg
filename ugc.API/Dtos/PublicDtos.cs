namespace ugc.API.Dtos;

public sealed class ContactRequest
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}

public sealed class PublicPageResponse
{
    public string Content { get; set; } = string.Empty;
}
