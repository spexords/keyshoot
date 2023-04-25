namespace Keyshoot.Core.Entities;

public abstract class BaseEntity
{
    public Guid Id { get; set; }
    public string? UpdatedBy { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
