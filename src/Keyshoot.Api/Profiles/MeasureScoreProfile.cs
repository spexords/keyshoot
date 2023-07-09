using AutoMapper;
using Keyshoot.Api.Dtos;
using Keyshoot.Core.Entities;

namespace Keyshoot.Api.Profiles;

public class MeasureScoreProfile : Profile
{
	public MeasureScoreProfile()
	{
		CreateMap<MeasureScore, HighscoreDto>()
			.ForMember(d => d.Language, opts => opts.MapFrom(s => s.Language.ToString()));
	}
}
