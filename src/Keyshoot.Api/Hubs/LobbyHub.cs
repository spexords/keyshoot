using Keyshoot.Api.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Keyshoot.Api.Hubs;

[Authorize]
public class LobbyHub : Hub
{
    private readonly ILogger<LobbyHub> _logger;

    public LobbyHub(ILogger<LobbyHub> logger)
    {
        _logger = logger;
    }

    public override Task OnConnectedAsync()
    {
        _logger.LogInformation("User {0} joined lobby hub", Context.User?.GetUsername());
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        _logger.LogInformation("User {0} left lobby hub", Context.User?.GetUsername());
        return base.OnDisconnectedAsync(exception);
    }
}
