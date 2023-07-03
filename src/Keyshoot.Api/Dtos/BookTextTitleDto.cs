using Keyshoot.Core.Entities;

namespace Keyshoot.Api.Dtos;

public class BookTextTitleDto
{
    public string Title { get; set; } = default!;
    public TextLanguage TextLanguage { get; set; } = default!;
}
