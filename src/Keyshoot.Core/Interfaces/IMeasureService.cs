using Keyshoot.Core.Entities.Measure;
using Keyshoot.Core.Entities;

namespace Keyshoot.Core.Interfaces;

public interface IMeasureService
{
    Task<Measure> CreateMeasureAsync(string player, TextLanguage language);
    Task<Measure> UpdateMeasureAsync(string player, string input);
    Task<Measure> FinishMeasureAsync(string player);
}