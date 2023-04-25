using Keyshoot.Core.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Keyshoot.Identity.Data;

public class AppIdentityDbContext : IdentityDbContext<AppUser>
{
    public AppIdentityDbContext(DbContextOptions options) : base(options)
    {
    }

    public override DbSet<AppUser> Users => Set<AppUser>();
}
