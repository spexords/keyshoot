using Keyshoot.Core.Entities;

namespace Keyshoot.Api.Dtos;

public class MeasureDto
{
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public TextLanguage Language { get; set; }
    public IEnumerable<WordDto> PastWords { get; set; } = default!;
    public WordDto CurrentWord { get; set; } = default!;
    public IEnumerable<WordDto> FutureWords { get; set; } = default!;
    public int Accuracy { get; set; }
    public int WordsPerMinute { get; set; }
}
