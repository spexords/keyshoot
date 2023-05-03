using AutoMapper;
using Keyshoot.Api.Dtos;
using Keyshoot.Core.Entities;

namespace Keyshoot.Api.Profiles;

public class BookTextProfile : Profile
{
	public BookTextProfile()
	{
		CreateMap<BookText, BookTextTitleDto>()
			.ForMember(d => d.Language, opts => opts.MapFrom(s => s.TextLanguage.ToString()));
	}
}
