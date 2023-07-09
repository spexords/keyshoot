using Keyshoot.Api.Features.Highscores.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Keyshoot.Api.Controllers;

public class HighscoresController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> GetAllHighscores()
    {
        var highscores = await Mediator.Send(new GetAllHighscoresQuery());
        return Ok(highscores);
    }
}