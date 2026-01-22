namespace ugc.API.Dtos;

public sealed class SearchSuggestResponse
{
    public IReadOnlyList<string> Suggestions { get; set; } = Array.Empty<string>();
}
