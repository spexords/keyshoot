using AutoMapper;
using Keyshoot.Api.Dtos;
using Keyshoot.Api.Extensions;
using Keyshoot.Core.Entities;
using Keyshoot.Core.Entities.Measure;
using Keyshoot.Core.Interfaces;
using Keyshoot.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace Keyshoot.Api.Hubs;

public interface IMeasureHub
{
    Task ReceiveMeasureStarted(MeasureDto measure);
    Task ReceiveMeasureUpdated(MeasureDto measure);
    Task ReceiveMeasureFinished(MeasureFinishedDto measure);
}

[Authorize]
public class MeasureHub : Hub<IMeasureHub>
{
	private static ConcurrentDictionary<string, CancellationTokenSource> CancellationTokens = new();
	private readonly IMeasureService _measureService;
	private readonly ILogger<MeasureHub> _logger;
	private readonly IMapper _mapper;
	private readonly KeyshootContext _context;

	public MeasureHub(IMeasureService measureService, ILogger<MeasureHub> logger, IMapper mapper, KeyshootContext context)
	{
		_measureService = measureService;
		_logger = logger;
		_mapper = mapper;
		_context = context;
	}

	public override Task OnConnectedAsync()
	{
		_logger.LogInformation("User: {0} joined measure hub", Context.User?.GetUsername());
		return base.OnConnectedAsync();
	}

	public override Task OnDisconnectedAsync(Exception? exception)
	{
		var username = Context.User!.GetUsername();
        _logger.LogInformation("User: {0} left measure hub", username);
		if(CancellationTokens.ContainsKey(username))
		{
			CancellationTokens[username].Cancel();
		}
        return base.OnDisconnectedAsync(exception);
	}

	public async Task CreateMeasure(MeasureOptionsDto options)
	{
		var username = Context.User!.GetUsername();
        var measure = await _measureService.CreateMeasureAsync(username, options.Language);
        _logger.LogInformation("User: {0} created measure #{1}", username, measure.Id);
		CancellationTokens[username] = new();
        await NotifyMeasureStarted(measure);
		await NotifyMeasureFinished(measure, options.Language);
    }

	public async Task UpdateMeasure(string input)
	{
        var username = Context.User!.GetUsername();
        _logger.LogInformation("User: {0} updated measure with input: {1}", username, input);
		var measure = await _measureService.UpdateMeasureAsync(username, input);
		await NotifyMeasureUpdated(measure);
	}

    private async Task NotifyMeasureStarted(Measure measure)
    {
        var measureDto = _mapper.Map<MeasureDto>(measure);
        await Clients.Caller.ReceiveMeasureStarted(measureDto);
    }

    private async Task NotifyMeasureUpdated(Measure measure)
	{
        var measureDto = _mapper.Map<MeasureDto>(measure);
        await Clients.Caller.ReceiveMeasureUpdated(measureDto);
    }

	private async Task NotifyMeasureFinished(Measure measure, TextLanguage language)
	{
		try
		{
			var username = Context.User!.GetUsername();
			var timeDiff = measure.EndTime - measure.StartTime;
			var token = CancellationTokens[username].Token;
			await Task.Delay((int)timeDiff.TotalMilliseconds, token);
			_logger.LogInformation("User: {0} finished measure", username);
			measure = await _measureService.FinishMeasureAsync(username);
			await SaveScore(username, measure, language);
			var measureFinished = _mapper.Map<MeasureFinishedDto>(measure);
            await Clients.Caller.ReceiveMeasureFinished(measureFinished);
		}
		catch(TaskCanceledException)
		{
            var username = Context.User!.GetUsername();
            _logger.LogInformation("User: {0} cancelled measure #{1}", username, measure.Id);
        }
    }

	private async Task SaveScore(string player, Measure measure, TextLanguage language)
	{
		_context.Add(new MeasureScore
		{
			Player = player,
			Language = language,
			Accuracy = measure.Accuracy,
			WordsPerMinute = measure.WordsPerMinute,
			Date = DateTime.Now
		});

		await _context.SaveChangesAsync();
	}
}
