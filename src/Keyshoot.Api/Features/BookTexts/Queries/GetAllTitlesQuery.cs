using Keyshoot.Api.Dtos;
using MediatR;

namespace Keyshoot.Api.Features.BookTexts.Queries;

public class GetAllTitlesQuery : IRequest<IEnumerable<BookTextTitleDto>>
{
}