using Keyshoot.Api.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Keyshoot.Api.Hubs;

[Authorize]
public class MeasureHub : Hub
{
	private readonly ILogger<MeasureHub> _logger;

	public MeasureHub(ILogger<MeasureHub> logger)
	{
		_logger = logger;
	}

	public override Task OnConnectedAsync()
	{
		_logger.LogInformation("User: {0} joined measure hub", Context.User?.GetUsername());
		return base.OnConnectedAsync();
	}

	public override Task OnDisconnectedAsync(Exception? exception)
	{
        _logger.LogInformation("User: {0} left measure hub", Context.User?.GetUsername());
        return base.OnDisconnectedAsync(exception);
	}
}
