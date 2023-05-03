using Keyshoot.Api.Features.BookTexts.Queries;
using Keyshoot.Core.Interfaces;
using MediatR;

namespace Keyshoot.Api.Features.BookTexts.Handlers;

public class GenerateWordsHandler : IRequestHandler<GenerateWordsQuery, IEnumerable<string>>
{
    private readonly IBookTextService _bookTextService;
    private readonly ILogger<GenerateWordsHandler> _logger;

    public GenerateWordsHandler(IBookTextService bookTextService, ILogger<GenerateWordsHandler> logger)
    {
        _bookTextService = bookTextService;
        _logger = logger;
    }

    public async Task<IEnumerable<string>> Handle(GenerateWordsQuery request, CancellationToken cancellationToken)
    {
        var text = await _bookTextService.GetBookTextAsync(request.Title);

        _logger.LogInformation("Taking {0} words from '{1}' book text", request.Count, request.Title);
        var words = text.Take(request.Count);

        return words;
    }
}
