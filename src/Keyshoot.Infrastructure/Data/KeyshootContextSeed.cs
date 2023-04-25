using Keyshoot.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Keyshoot.Infrastructure.Data;

public class KeyshootContextSeed
{
    private const string TextsPath = "./Texts";
    public static async Task SeedAsync(KeyshootContext context, ILoggerFactory loggerFactory)
    {
        var logger = loggerFactory.CreateLogger<KeyshootContextSeed>();
        try
        {
            if (!await context.BookTexts.AnyAsync())
            {
                logger.LogInformation("Seeding book texts");
                await AddBookTexts(context);
            }
        } catch(Exception ex)
        {
            logger.LogError(ex.Message);
        }
    }

    private static async Task AddBookTexts(KeyshootContext context)
    {
        foreach (var path in Directory.GetFiles(TextsPath, "*.txt"))
        {
            var fileName = Path.GetFileNameWithoutExtension(path);
            var bookText = new BookText
            {
                Path = path,
                Author = GetAuthor(fileName),
                Title = GetTitle(fileName),
                TextLanguage = GetTextLanguage(fileName),
            };
            await context.AddAsync(bookText);
        }
        await context.SaveChangesAsync();
    }

    private static string GetAuthor(string fileName)
    {
        var author = fileName.Split('-')[1];
        return author.Replace('_', ' ');
    }

    private static TextLanguage GetTextLanguage(string fileName)
    {
        var version = fileName.Split('-')[2];
        return Enum.Parse<TextLanguage>(version);
    }

    private static string GetTitle(string fileName)
    {
        var title = fileName.Split('-')[0];
        return title.Replace('_', ' ');
    }
}
