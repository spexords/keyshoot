using Keyshoot.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Keyshoot.Infrastructure.Data.Config;

public class MeasureScoreConfiguration : IEntityTypeConfiguration<MeasureScore>
{
    public void Configure(EntityTypeBuilder<MeasureScore> builder)
    {
        builder.ToTable("MeasureScores");
    }
}