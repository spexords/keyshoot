using Microsoft.OpenApi.Models;

namespace Keyshoot.Api.Extensions;

public static class SwaggerExtensions
{
    public static IServiceCollection AddSwaggerGenWithOAuth(this IServiceCollection @this, IConfiguration config)
    {
        @this.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "OAuth",
                Name = "Authorization",
                Type = SecuritySchemeType.OAuth2,
                Flows = new OpenApiOAuthFlows
                {
                    Implicit = new OpenApiOAuthFlow
                    {
                        Scopes = new Dictionary<string, string>
                        {
                            {"api", "Keyshoot api" }
                        },
                        AuthorizationUrl = new Uri(config["ExternalServices:Identity"] + "/connect/authorize"),
                        TokenUrl = new Uri(config["ExternalServices:Identity"] + "/connect/authorize"),
                    }
                }
            });

            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        },
                        Scheme = "oauth2",
                        Name = "Bearer",
                        In = ParameterLocation.Header,
                    },
                    new List<string>()
                }
               });
        });
        return @this;
    }

    public static void UseSwaggerWithOAuth(this IApplicationBuilder @this)
    {
        @this.UseSwagger();
        @this.UseSwaggerUI(options =>
        {
            options.OAuthClientId("swagger.api");
        });
    }
}
