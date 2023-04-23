using Duende.IdentityServer;
using Duende.IdentityServer.Models;
using IdentityModel;

namespace Keyshoot.Identity;

public static class SD
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new List<IdentityResource>
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Email(),
            new IdentityResources.Profile()
        };

    public static IEnumerable<ApiResource> ApiResources =>
        new List<ApiResource>
        {
            new ApiResource("api", "Keyshoot API")
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new List<ApiScope>
        {
            new ApiScope("api", "Keyshoot API"),
        };


    public static IEnumerable<Client> Clients =>
        new List<Client>
        {
            new Client
            {
                ClientId = "swagger.api",
                ClientName = "flow for swagger",
                RedirectUris =
                {
                    "https://localhost:5001/swagger/oauth2-redirect.html",
                },
                AllowedScopes = { "api" },
                ClientSecrets = { new Secret("secret".Sha256()) },
                AllowedGrantTypes = GrantTypes.Implicit,
                AllowAccessTokensViaBrowser = true,
                
            },
            new Client
            {
                ClientId = "web",
                ClientName = "Auth flow for web",
                ClientSecrets = { new Secret("secret".Sha256()) },
                AllowedGrantTypes = GrantTypes.Implicit,
                AllowedScopes = { 
                    "api",
                    IdentityServerConstants.StandardScopes.OpenId,
                },
                RedirectUris = {"http://localhost:4200" },
                AllowAccessTokensViaBrowser = true,
                AlwaysIncludeUserClaimsInIdToken = true,
                AllowedCorsOrigins = { "http://localhost:4200" },
                PostLogoutRedirectUris = { "http://localhost:4200" }
            }
        };
}
