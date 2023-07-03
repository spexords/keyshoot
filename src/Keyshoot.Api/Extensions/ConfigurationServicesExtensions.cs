using Keyshoot.Core.Settings;

public static class ConfigurationServicesExtensions
{
    public static IServiceCollection AddSettingsBindings(this IServiceCollection @this, IConfiguration config)
    {
        @this.Configure<MeasureSettings>(config.GetSection("MeasureSettings"));

        return @this;
    }
}
