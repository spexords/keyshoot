namespace Keyshoot.Api.Extensions;

public static class ApplicationServicesExtensions
{
    private class Cors
    {
        public string PolicyName { get; set; } = default!;
        public string[] AllowedOrigins { get; set; } = default!;
    }

    public static void AddApplicationServices(this IServiceCollection @this, IConfiguration config)
    {
        var cors = config.GetSection("Cors").Get<Cors>();
        @this.AddCors(options =>
        {
            options.AddPolicy(cors.PolicyName,
                policy =>
                {
                    policy.AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins(cors.AllowedOrigins.ToArray());
                });
        });
    }
}
