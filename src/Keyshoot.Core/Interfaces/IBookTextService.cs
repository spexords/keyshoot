namespace Keyshoot.Core.Interfaces;

public interface IBookTextService
{
    Task<IEnumerable<string>> GetBookTextAsync(string title);
}
