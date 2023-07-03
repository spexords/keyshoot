using Keyshoot.Core.Entities;
using Keyshoot.Core.Entities.Measure;
using Keyshoot.Core.Exceptions;
using Keyshoot.Core.Interfaces;
using Keyshoot.Core.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using StackExchange.Redis;
using System.Net;
using System.Text.Json;

namespace Keyshoot.Infrastructure.Services;

public class MeasureService : IMeasureService
{
    private readonly ILogger<MeasureService> _logger;
    private readonly IWordsService _wordsService;
    private readonly MeasureSettings _settings;
    private readonly IDatabase _database;

    public MeasureService(
        ILogger<MeasureService> logger,
        IConnectionMultiplexer redis,
        IWordsService wordsService,
        IOptions<MeasureSettings> options)
    {
        _logger = logger;
        _wordsService = wordsService;
        _settings = options.Value;
        _database = redis.GetDatabase();
    }

    public async Task<Measure> CreateMeasureAsync(string player, TextLanguage language)
    {
        var words = await _wordsService.GenerateWordsAsync(_settings.DefaultWordsCount, language);

        var mappedWords = words.Select(word => new Word { Id = Guid.NewGuid(), State = WordState.New, Value = word }).ToList();

        mappedWords.First().State = WordState.Current;

        var measure = new Measure
        {
            Id = Guid.NewGuid(),
            StartTime = DateTime.Now,
            EndTime = DateTime.Now.AddMinutes(_settings.MeasureTimeMinutes),
            Accuracy = 100,
            WordsPerMinute = 0,
            Player = player,
            Language = language,
            Words = mappedWords,
        };

        _logger.LogInformation("Saving measure #{0} to Redis", measure.Id);
        await _database.StringSetAsync(player, JsonSerializer.Serialize(measure), new TimeSpan(0, 0, _settings.MeasureExpirySeconds));

        return measure;
    }

    public async Task<Measure> UpdateMeasureAsync(string player, string input)
    {
        var measure = await GetMeasureForPlayerAsync(player);

        var currentWord = measure.Words.First(word => word.State == WordState.Current);
        currentWord.State = currentWord.Value == input ? WordState.Valid : WordState.Invalid;

        var nextWord = measure.Words.First(word => word.State == WordState.New);

        if (nextWord is null)
        {
            throw new BaseApiException(HttpStatusCode.BadRequest, "Measure exceeded default words maxium");
        }

        nextWord.State = WordState.Current;

        _logger.LogInformation("Saving measure #{0} to Redis", measure.Id);
        await _database.StringSetAsync(player, JsonSerializer.Serialize(measure));

        UpdateMeasureStatistics(measure);

        return measure;
    }

    public async Task<Measure> FinishMeasureAsync(string player)
    {
        var measure = await GetMeasureForPlayerAsync(player);

        UpdateMeasureStatistics(measure);

        return measure;
    }

    private async Task<Measure> GetMeasureForPlayerAsync(string player)
    {
        _logger.LogInformation("Fetching measure for player:{0} from Redis", player);
        var data = await _database.StringGetAsync(player);

        if (data.IsNullOrEmpty)
        {
            throw new BaseApiException(HttpStatusCode.NotFound, $"Measure for {player} does not exist");
        }

        var measure = JsonSerializer.Deserialize<Measure>(data!);

        if (measure is null)
        {
            throw new BaseApiException(HttpStatusCode.InternalServerError, "Measure deserialization failed");
        }

        return measure;
    }

    private void UpdateMeasureStatistics(Measure measure)
    {
        var words = measure.Words.Where(word => word.State == WordState.Valid || word.State == WordState.Invalid);
        var validWords = measure.Words.Where(word => word.State == WordState.Valid);
        var timeDiff = DateTime.Now - measure.StartTime;

        measure.Accuracy = (int)(validWords.Count() * 100 / (words.Count() == 0 ? 1 : words.Count()));

        measure.WordsPerMinute = (int)(validWords.Sum(word => word.Value.Length) / _settings.AverageCharactersInWord / timeDiff.TotalMinutes);
    }
}
