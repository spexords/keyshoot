namespace Keyshoot.Core.Entities.Measure;

public class Word
{
    public Guid Id { get; set; }
    public string Value { get; set; } = default!;
    public WordState State { get; set; } = WordState.New;
}
