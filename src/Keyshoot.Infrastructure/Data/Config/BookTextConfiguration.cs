using Keyshoot.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Keyshoot.Infrastructure.Data.Config;

public class BookTextConfiguration : IEntityTypeConfiguration<BookText>
{
    public void Configure(EntityTypeBuilder<BookText> builder)
    {
        builder.ToTable("BookTexts");
        builder.HasIndex(b => b.Title)
            .IsUnique();
    }
}
