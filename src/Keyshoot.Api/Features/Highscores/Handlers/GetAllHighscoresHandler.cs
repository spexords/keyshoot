using AutoMapper;
using Keyshoot.Api.Dtos;
using Keyshoot.Api.Features.Highscores.Queries;
using Keyshoot.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Keyshoot.Api.Features.Highscores.Handlers;

public class GetAllHighscoresHandler : IRequestHandler<GetAllHighscoresQuery, IEnumerable<HighscoreDto>>
{
    private readonly KeyshootContext _context;
    private readonly ILogger<GetAllHighscoresHandler> _logger;
    private readonly IMapper _mapper;

    public GetAllHighscoresHandler(KeyshootContext context, ILogger<GetAllHighscoresHandler> logger, IMapper mapper)
    {
        _context = context;
        _logger = logger;
        _mapper = mapper;
    }

    public async Task<IEnumerable<HighscoreDto>> Handle(GetAllHighscoresQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Fetching all highscores from database");
        var highscores = await _context.MeasureScores.ToListAsync(cancellationToken);

        var highscoresDtos = _mapper.Map<IEnumerable<HighscoreDto>>(highscores);

        return highscoresDtos;
    }
}
