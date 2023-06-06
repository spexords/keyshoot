using AutoMapper;
using Keyshoot.Api.Dtos;
using Keyshoot.Api.Resolvers;
using Keyshoot.Core.Entities.Measure;

namespace Keyshoot.Api.Profiles;

public class MeasureProfile : Profile
{
	public MeasureProfile()
	{
		CreateMap<Measure, MeasureDto>()
			.ForMember(d => d.PastWords, opts => opts.MapFrom<PastWordsResolver>())
			.ForMember(d => d.CurrentWord, opts => opts.MapFrom<CurrentWordResolver>())
			.ForMember(d => d.FutureWords, opts => opts.MapFrom<FutureWordsResolver>());

		CreateMap<Measure, MeasureFinishedDto>();
	}
}
