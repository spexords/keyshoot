using Microsoft.AspNetCore.Mvc;

namespace Keyshoot.Api.Controllers;

public class TestController : BaseApiController
{
    [HttpGet]
    public ActionResult<string> GetTestMessage()
    {
        return "Test message";
    } 
}