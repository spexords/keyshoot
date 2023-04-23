using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using Keyshoot.Core.Entities.Identity;
using Keyshoot.Identity;
using Keyshoot.Identity.Data;
using Keyshoot.Identity.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.ConfigureIdentityServer(config);

builder.Services.AddRazorPages();

var app = builder.Build();

//Seed data
using var scope = app.Services.CreateScope();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
await AppIdentityDbContextSeed.SeedAsync(userManager);

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseIdentityServer();

app.UseAuthorization();

app.MapRazorPages();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
