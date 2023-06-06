using Keyshoot.Core.Entities;
using Keyshoot.Core.Interfaces;
using Keyshoot.Infrastructure.Data;
using Microsoft.Extensions.Logging;
using System.Collections.Immutable;

namespace Keyshoot.Infrastructure.Services;

public class WordsService : IWordsService
{
	private readonly KeyshootContext _context;
	private readonly IBookTextService _bookTextService;
	private readonly ILogger<WordsService> _logger;

	public WordsService(KeyshootContext context, IBookTextService bookTextService, ILogger<WordsService> logger)
	{
		_context = context;
		_bookTextService = bookTextService;
		_logger = logger;
	}

	public async Task<IEnumerable<string>> GenerateWordsAsync(int count, TextLanguage language)
	{
		_logger.LogInformation("Generating random words for language: {0}", language);
		var bookTextSource = await _bookTextService.GetRandomBookTextSourceAsync(language);
		var wordsArray = bookTextSource.ToImmutableArray();
		var startIndex = Random.Shared.Next(wordsArray.Length - count);
		return wordsArray.Skip(startIndex).Take(count);
	}
}
