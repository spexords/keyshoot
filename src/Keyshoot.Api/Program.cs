using Keyshoot.Api.Extensions;
using Keyshoot.Core.Entities.Identity;
using Keyshoot.Infrastructure.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using Serilog.Events;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var config = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
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

app.UseSwaggerWithOAuth();

app.UseHttpsRedirection();

app.UseCors(config["Cors:PolicyName"]);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
