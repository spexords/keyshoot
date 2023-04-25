using System.Security.Claims;

namespace Keyshoot.Api.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static string GetUsername(this ClaimsPrincipal @this)
    {
        return @this.FindFirstValue("id");
    }
}
