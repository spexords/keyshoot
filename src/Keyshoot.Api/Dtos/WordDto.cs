using Keyshoot.Core.Entities.Measure;

namespace Keyshoot.Api.Dtos;

public class WordDto
{
    public string Value { get; set; } = default!;
    public WordState State { get; set; }
}
