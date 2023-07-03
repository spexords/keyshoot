using Keyshoot.Api.Extensions;
using Keyshoot.Api.Hubs;
using Keyshoot.Api.Middlewares;
using Keyshoot.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((ctx, lc) => lc
    .WriteTo.Console());

var config = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSettingsBindings(config);
builder.Services.AddIdentityServices(config);
builder.Services.AddSwaggerGenWithOAuth(config);
builder.Services.AddApplicationServices(config);


var app = builder.Build();

//migrations & seeding
using var scope = app.Services.CreateScope();
var loggerFactory = scope.ServiceProvider.GetRequiredService<ILoggerFactory>();
var context = scope.ServiceProvider.GetRequiredService<KeyshootContext>();
await context.Database.MigrateAsync();
await KeyshootContextSeed.SeedAsync(context, loggerFactory);

// Configure the HTTP request pipeline.

app.UseMiddleware<ExceptionMiddleware>();

app.UseSwaggerWithOAuth();

app.UseHttpsRedirection();

app.UseCors(config["CorsSettings:PolicyName"]);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapHub<LobbyHub>("/hubs/lobby");
app.MapHub<MeasureHub>("/hubs/measure");

app.Run();
