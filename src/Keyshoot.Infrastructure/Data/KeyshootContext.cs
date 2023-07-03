using Keyshoot.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Keyshoot.Infrastructure.Data;

public class KeyshootContext : DbContext
{

    public KeyshootContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<BookText> BookTexts => Set<BookText>();
    public DbSet<MeasureScore> MeasureScores => Set<MeasureScore>();
}
