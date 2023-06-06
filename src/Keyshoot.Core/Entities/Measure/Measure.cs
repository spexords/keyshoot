namespace Keyshoot.Core.Entities.Measure;

public class Measure
{
    public Guid Id { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public TextLanguage Language { get; set; }
    public IEnumerable<Word> Words { get; set; } = default!;
    public int Accuracy { get; set; }
    public int WordsPerMinute { get; set; }
    public string Player { get; set; } = default!;
}
