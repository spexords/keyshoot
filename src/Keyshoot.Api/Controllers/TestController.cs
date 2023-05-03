using Keyshoot.Api.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using System.Security.Claims;

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
        var username = User.GetUsername();
        return $"Test auth: {username} message";
    }
}
