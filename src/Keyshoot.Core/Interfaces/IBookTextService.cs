using Keyshoot.Core.Entities;

namespace Keyshoot.Core.Interfaces;

public interface IBookTextService
{
    Task<IEnumerable<string>> GetBookTextSourceAsync(string title);
    Task<IEnumerable<string>> GetRandomBookTextSourceAsync(TextLanguage language);
}
