namespace Keyshoot.Core.Settings;

public class CorsSettings
{
    public string PolicyName { get; set; } = default!;
    public string[] AllowedOrigins { get; set; } = default!;
}
