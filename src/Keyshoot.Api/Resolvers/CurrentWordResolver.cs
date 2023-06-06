using AutoMapper;
using Keyshoot.Api.Dtos;
using Keyshoot.Core.Entities.Measure;

namespace Keyshoot.Api.Resolvers;

public class CurrentWordResolver : IValueResolver<Measure, MeasureDto, WordDto>
{
    public WordDto Resolve(Measure source, MeasureDto destination, WordDto destMember, ResolutionContext context) =>
        source.Words
            .Where(word => word.State == WordState.Current)
            .Select(word => new WordDto { State = word.State, Value = word.Value })
            .First();
}
