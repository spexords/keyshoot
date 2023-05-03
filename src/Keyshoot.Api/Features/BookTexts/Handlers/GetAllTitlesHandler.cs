using AutoMapper;
using Keyshoot.Api.Dtos;
using Keyshoot.Api.Features.BookTexts.Queries;
using Keyshoot.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Keyshoot.Api.Features.BookTexts.Handlers;

public class GetAllTitlesHandler : IRequestHandler<GetAllTitlesQuery, IEnumerable<BookTextTitleDto>>
{
    private readonly ILogger<GetAllTitlesHandler> _logger;
    private readonly KeyshootContext _context;
    private readonly IMapper _mapper;

    public GetAllTitlesHandler(ILogger<GetAllTitlesHandler> logger, KeyshootContext context, IMapper mapper)
    {
        _logger = logger;
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<BookTextTitleDto>> Handle(GetAllTitlesQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Fetching all book text titles");
        var bookTexts = await _context.BookTexts.ToListAsync(cancellationToken);
        var titles = _mapper.Map<IEnumerable<BookTextTitleDto>>(bookTexts);
        return titles;
    }
}
