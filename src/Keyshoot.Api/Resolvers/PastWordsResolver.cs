using AutoMapper;
using Keyshoot.Api.Dtos;
using Keyshoot.Core.Entities.Measure;

namespace Keyshoot.Api.Resolvers;

public class PastWordsResolver : IValueResolver<Measure, MeasureDto, IEnumerable<WordDto>>
{
    public IEnumerable<WordDto> Resolve(Measure source, MeasureDto destination, IEnumerable<WordDto> destMember, ResolutionContext context) =>
        source.Words
            .TakeWhile(word => word.State != WordState.Current)
            .TakeLast(15)
            .Select(word => new WordDto { State = word.State, Value = word.Value});
}
