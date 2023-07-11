using AutoMapper;
using Keyshoot.Api.Dtos;
using Keyshoot.Api.Features.Highscores.Queries;
using Keyshoot.Core.Entities;
using Keyshoot.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Keyshoot.Api.Features.Highscores.Handlers;

public class GetHighscoresHandler : IRequestHandler<GetHighscoresQuery, IEnumerable<HighscoreDto>>
{
    private const string DefaultOrder = "ASC";
    private readonly KeyshootContext _context;
    private readonly ILogger<GetHighscoresHandler> _logger;
    private readonly IMapper _mapper;

    public GetHighscoresHandler(KeyshootContext context, ILogger<GetHighscoresHandler> logger, IMapper mapper)
    {
        _context = context;
        _logger = logger;
        _mapper = mapper;
    }

    public async Task<IEnumerable<HighscoreDto>> Handle(GetHighscoresQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Fetching highscores from database");
         var queryableScores = _context.MeasureScores.AsQueryable();

        var language = Enum.Parse<TextLanguage>(request.Language);
        queryableScores = queryableScores.Where(score => score.Language == language);

        if(request.Player != null)
        {
            queryableScores = queryableScores.Where(score => score.Player.ToLower().Contains(request.Player.ToLower()));
        }

        if(request.Order == DefaultOrder)
        {
            queryableScores = queryableScores
                .OrderBy(score => score.WordsPerMinute)
                .ThenBy(score => score.Accuracy)
                .ThenByDescending(score => score.Date);
        }
        else
        {
            queryableScores = queryableScores
                .OrderByDescending(score => score.WordsPerMinute)
                .ThenByDescending(score => score.Accuracy)
                .ThenByDescending(score => score.Date);
        }

        var highscores = await queryableScores.ToListAsync(cancellationToken);

        var highscoresDtos = _mapper.Map<IEnumerable<HighscoreDto>>(highscores);

        return highscoresDtos;
    }
}
