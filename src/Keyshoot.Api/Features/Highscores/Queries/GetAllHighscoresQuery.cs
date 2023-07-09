using Keyshoot.Api.Dtos;
using MediatR;

namespace Keyshoot.Api.Features.Highscores.Queries;

public class GetAllHighscoresQuery : IRequest<IEnumerable<HighscoreDto>>
{
}
