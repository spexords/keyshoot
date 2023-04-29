using Keyshoot.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Keyshoot.Infrastructure.Services;

public class BookTextService
{
	private readonly KeyshootContext _context;

	public BookTextService(KeyshootContext context)
	{
		_context = context;
	}

	public async Task<IEnumerable<string>> GetBookTextTitles()
	{
		return await _context.BookTexts.Select(b => b.Title).ToListAsync();
	}

	public async Task<IEnumerable<string>> GenerateWords(int count, string title)
	{
		var 
	}
}
