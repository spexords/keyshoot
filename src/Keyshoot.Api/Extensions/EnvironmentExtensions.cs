namespace Keyshoot.Api.Extensions;

public static class EnvironmentExtensions
{
    public static bool IsDockerEnvironment() => Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Docker";
}
