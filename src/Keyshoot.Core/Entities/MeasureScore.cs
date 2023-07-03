namespace Keyshoot.Core.Entities;

public class MeasureScore : BaseEntity
{
    public string Player { get; set; } = default!;
    public TextLanguage Language { get; set; }
    public int Accuracy { get; set; } = default!;
    public int WordsPerMinute { get; set; } = default!;
    public DateTime Date { get; set; }
}