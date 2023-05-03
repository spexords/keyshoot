using Keyshoot.Api.Features.BookTexts.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Keyshoot.Api.Controllers;

[Authorize]
public class BookTextsController : BaseApiController
{
    [HttpGet("generate-words")]
    public async Task<ActionResult<IEnumerable<string>>> GenerateWords(string title, int count)
    {
        var words = await Mediator.Send(new GenerateWordsQuery { Count = count, Title = title });

        return Ok(words);
    }
}