using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Keyshoot.Api.Controllers;

public class TestController : BaseApiController
{
    [HttpGet]
    public ActionResult<string> GetTestMessage()
    {
        return "Test message";
    }

    [Authorize]
    [HttpGet("auth")]
    public ActionResult<string> GetTestAuthMessage()
    {
        return "Test auth message";
    }
}