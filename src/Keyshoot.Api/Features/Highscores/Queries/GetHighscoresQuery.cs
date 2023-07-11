using Keyshoot.Api.Dtos;
using Keyshoot.Core.Entities;
using MediatR;

namespace Keyshoot.Api.Features.Highscores.Queries;

public class GetHighscoresQuery : IRequest<IEnumerable<HighscoreDto>>
{
    public string Language { get; set; } = default!;
    public string? Player { get; set; } = default!;
    public string Order { get; set; } = default!;
}
