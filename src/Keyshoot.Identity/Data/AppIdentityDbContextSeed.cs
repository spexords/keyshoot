using IdentityModel;
using Keyshoot.Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Keyshoot.Identity.Data;

public class AppIdentityDbContextSeed
{
    public static async Task SeedAsync(UserManager<AppUser> userManager)
    {
        if (await userManager.FindByNameAsync("bob") is not null)
        {
            return;
        }
        
        var user = new AppUser
        {
            UserName = "bob",
            Email = "bob@test.com",
        };

        await userManager.CreateAsync(user, "Pa$$W0rd");
        await userManager.AddClaimsAsync(user, new Claim[]
        {
            new Claim(JwtClaimTypes.Id, user.UserName),
        });
    }
}