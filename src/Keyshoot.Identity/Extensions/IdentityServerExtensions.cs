using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using Keyshoot.Core.Entities.Identity;
using Keyshoot.Identity.Data;
using Keyshoot.Identity.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Keyshoot.Identity.Extensions;

public static class IdentityServerExtensions
{
    class OAuthSettings
    {
        public ApiResource[] ApiResources { get; set; } = default!;
        public ApiScope[] ApiScopes { get; set; } = default!;
        public Client[] Clients { get; set; } = default!;
    }

    public static IServiceCollection ConfigureIdentityServer(this IServiceCollection @this, IConfiguration config)
    {
        var oauthSettings = config.GetSection("OAuthSettings").Get<OAuthSettings>();

        @this.AddDbContext<AppIdentityDbContext>(options =>
            options.UseSqlServer(config.GetConnectionString("DefaultConnection")));

        @this.AddIdentity<AppUser, IdentityRole>(options =>
        {
            options.User.RequireUniqueEmail = true;
        })
        .AddEntityFrameworkStores<AppIdentityDbContext>()
        .AddDefaultTokenProviders();

        @this.AddIdentityServer(options =>
        {
            options.Events.RaiseErrorEvents = true;
            options.Events.RaiseInformationEvents = true;
            options.Events.RaiseFailureEvents = true;
            options.Events.RaiseSuccessEvents = true;
            options.EmitStaticAudienceClaim = true;
        }).AddInMemoryIdentityResources(new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Email(),
            new IdentityResources.Profile()
        })
        .AddInMemoryApiResources(oauthSettings.ApiResources)
        .AddInMemoryApiScopes(oauthSettings.ApiScopes)
        .AddInMemoryClients(oauthSettings.Clients)
        .AddAspNetIdentity<AppUser>()
        .AddDeveloperSigningCredential()
        .AddProfileService<ProfileService>();

        @this.AddScoped<IProfileService, ProfileService>();
        return @this;
    }
}
