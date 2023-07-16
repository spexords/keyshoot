using Keyshoot.Api.Dtos;
using Keyshoot.Api.Extensions;
using Keyshoot.Core.Entities;
using MediatR;

namespace Keyshoot.Api.Features.Highscores.Queries;

public class GetHighscoresQuery : IRequest<PagedResult<HighscoreDto>>
{
    public int Language { get; set; } = default!;
    public string? Player { get; set; } = default!;
    public string Order { get; set; } = default!;
    public int PageIndex { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}
