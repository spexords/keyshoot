using Keyshoot.Core.Entities;

namespace Keyshoot.Api.Dtos;

public class HighscoreDto
{
    public string Player { get; set; } = default!;
    public string Language { get; set; } = default!;
    public int Accuracy { get; set; } = default!;
    public int WordsPerMinute { get; set; } = default!;
    public DateTime Date { get; set; }
}
