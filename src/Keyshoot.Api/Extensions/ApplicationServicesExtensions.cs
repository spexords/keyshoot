using Keyshoot.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Keyshoot.Api.Extensions;

public static class ApplicationServicesExtensions
{
    private class Cors
    {
        public string PolicyName { get; set; } = default!;
        public string[] AllowedOrigins { get; set; } = default!;
    }

    public static IServiceCollection AddApplicationServices(this IServiceCollection @this, IConfiguration config)
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
        @this.AddDbContext<KeyshootContext>(options => options.UseSqlServer(config.GetConnectionString("SqlConnection")));
        return @this;
    }
}
