using Keyshoot.Api.Dtos;
using Keyshoot.Api.Features.Highscores.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Keyshoot.Api.Controllers;

public class LeaderboardController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> GetHighscores([FromQuery] GetHighscoresQuery query)
    {
        var highscores = await Mediator.Send(query);
        return Ok(highscores);
    }
}