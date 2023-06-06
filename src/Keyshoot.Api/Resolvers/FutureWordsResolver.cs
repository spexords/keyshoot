using AutoMapper;
using Keyshoot.Api.Dtos;
using Keyshoot.Core.Entities.Measure;

namespace Keyshoot.Api.Resolvers;

public class FutureWordsResolver : IValueResolver<Measure, MeasureDto, IEnumerable<WordDto>>
{
    public IEnumerable<WordDto> Resolve(Measure source, MeasureDto destination, IEnumerable<WordDto> destMember, ResolutionContext context) =>
        source.Words
            .SkipWhile(word => word.State != WordState.Current)
            .Skip(1)
            .Take(15)
            .Select(word => new WordDto { State = word.State, Value = word.Value});
}