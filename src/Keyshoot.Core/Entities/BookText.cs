using System.Net.NetworkInformation;

namespace Keyshoot.Core.Entities;

public class BookText : BaseEntity
{
    public TextLanguage TextLanguage { get; set; }
    public string Title { get; set; } = default!;
    public string Path { get; set; } = default!;
    public string? Author { get; set; }
}
