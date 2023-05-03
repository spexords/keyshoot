using Keyshoot.Api.Features.BookTexts.Queries;
using Keyshoot.Core.Interfaces;
using Keyshoot.Infrastructure.Data;
using Keyshoot.Infrastructure.Services;
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
        @this.AddMediatR(config => config.RegisterServicesFromAssembly(typeof(GenerateWordsQuery).Assembly));
        @this.AddScoped<IBookTextService, BookTextService>();


        return @this;
    }
}
