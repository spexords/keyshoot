using Keyshoot.Core.Entities;

namespace Keyshoot.Core.Interfaces;

public interface IWordsService
{
    Task<IEnumerable<string>> GenerateWordsAsync(int count, TextLanguage language);
}
