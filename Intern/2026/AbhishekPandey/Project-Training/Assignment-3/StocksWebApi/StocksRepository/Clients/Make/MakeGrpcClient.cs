using Google.Protobuf.WellKnownTypes;
using Grpc.Net.Client;
using Microsoft.Extensions.Logging;
using StocksGrpcService.Protos;
using System.Diagnostics;

namespace StocksRepository.Clients;

public class MakeGrpcClient : IMakeGrpcClient, IDisposable
{
    private readonly GrpcChannel _channel;
    private readonly MakeService.MakeServiceClient _client;
    private readonly ILogger<MakeGrpcClient> _logger;

    public MakeGrpcClient(string grpcServerUrl, ILogger<MakeGrpcClient> logger)
    {
        _channel = GrpcChannel.ForAddress(grpcServerUrl);
        _client = new MakeService.MakeServiceClient(_channel);
        _logger = logger;
    }

    public async Task<MakeListgrpcDTO> GetAllMakeAsync()
    {
        var sw = Stopwatch.StartNew();
        _logger.LogInformation("Make gRPC Client: Starting GetMake call.");

        try
        {
            var response = await _client.GetMakeAsync(new Empty());
            sw.Stop();
            _logger.LogInformation("Make gRPC Client: Fetched {Count} makes in {ElapsedMs}ms", 
                response.Make.Count, sw.ElapsedMilliseconds);
            return response;
        }
        catch (Exception ex)
        {
            sw.Stop();
            _logger.LogError(ex, "Make gRPC Client Error: GetMake failed after {ElapsedMs}ms", sw.ElapsedMilliseconds);
            throw;
        }
    }

    public void Dispose() => _channel?.Dispose();
}