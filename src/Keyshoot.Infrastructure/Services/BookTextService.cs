using Keyshoot.Core.Entities;
using Keyshoot.Core.Exceptions;
using Keyshoot.Core.Interfaces;
using Keyshoot.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Net;

namespace Keyshoot.Infrastructure.Services;

public class BookTextService : IBookTextService
{
	private readonly KeyshootContext _context;
	private readonly ILogger<BookTextService> _logger;
	private static readonly Dictionary<string, string[]> _bookTextsSource = new();

	public BookTextService(KeyshootContext context, ILogger<BookTextService> logger)
	{
		_context = context;
		_logger = logger;
	}

	public async Task<IEnumerable<string>> GetBookTextAsync(string title)
	{
		if(!_bookTextsSource.Any())
		{
			await LoadBookTextsSource();
		}

		if(!_bookTextsSource.ContainsKey(title))
		{
			throw new BaseApiException(HttpStatusCode.NotFound, $"Book text: '{title}' does not exist");
        }

        return _bookTextsSource[title];
	}

	private async Task LoadBookTextsSource()
	{
		var bookTexts = await _context.BookTexts.ToListAsync();

		foreach(var bookText in bookTexts)
		{
            _logger.LogInformation("Loading '{0}' into book texts source", bookText.Title);
            var text = await File.ReadAllTextAsync(bookText.Path);
			_bookTextsSource[bookText.Title] = text.Split(' ');
		}
	}
}
