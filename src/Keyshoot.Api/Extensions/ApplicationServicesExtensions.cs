
using Keyshoot.Api.Features.BookTexts.Queries;
using Keyshoot.Core.Interfaces;
using Keyshoot.Core.Settings;
using Keyshoot.Infrastructure.Data;
using Keyshoot.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

public static class ApplicationServicesExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection @this, IConfiguration config)
    {
        var cors = config.GetSection("Cors").Get<CorsSettings>();
        @this.AddCors(options =>
        {
            options.AddPolicy(cors.PolicyName,
                policy =>
                {
                    policy.AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .WithOrigins(cors.AllowedOrigins);
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
        @this.AddAutoMapper(typeof(Program).Assembly);
        @this.AddScoped<IBookTextService, BookTextService>();
        @this.AddScoped<IWordsService, WordsService>();
        @this.AddScoped<IMeasureService, MeasureService>();

        return @this;
    }
}
