using Keyshoot.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;

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
        @this.AddSignalR();

        @this.AddSingleton<IConnectionMultiplexer>(c =>
        {
            var options = ConfigurationOptions.Parse(config.GetConnectionString("redis"));
            return ConnectionMultiplexer.Connect(options);
        });
        @this.AddDbContext<KeyshootContext>(options => options.UseSqlServer(config.GetConnectionString("SqlConnection")));


        return @this;
    }
}
