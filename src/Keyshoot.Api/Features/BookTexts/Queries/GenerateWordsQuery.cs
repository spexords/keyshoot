using MediatR;

namespace Keyshoot.Api.Features.BookTexts.Queries;

public class GenerateWordsQuery : IRequest<IEnumerable<string>>
{
    public int Count { get; set; }
    public string Title { get; set; } = default!;
}
