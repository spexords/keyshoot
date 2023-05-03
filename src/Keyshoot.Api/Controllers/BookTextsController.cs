using Keyshoot.Api.Features.BookTexts.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Keyshoot.Api.Controllers;

[Authorize]
public class BookTextsController : BaseApiController
{
    [HttpGet("generate-words")]
    public async Task<IActionResult> GenerateWords(string title, int count)
    {
        var words = await Mediator.Send(new GenerateWordsQuery { Count = count, Title = title });

        return Ok(words);
    }

    [HttpGet("titles")]
    public async Task<IActionResult> GetAllTitles()
    {
        var titles = await Mediator.Send(new GetAllTitlesQuery());

        return Ok(titles);
    }
}