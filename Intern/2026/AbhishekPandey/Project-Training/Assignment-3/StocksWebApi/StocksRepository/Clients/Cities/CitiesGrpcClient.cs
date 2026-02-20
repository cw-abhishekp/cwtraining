using Google.Protobuf.WellKnownTypes;
using Grpc.Net.Client;
using Microsoft.Extensions.Logging;
using StocksGrpcService.Protos;
using System.Diagnostics;

namespace StocksRepository.Clients;

public class CitiesGrpcClient : ICitiesGrpcClient, IDisposable
{
    private readonly GrpcChannel _channel;
    private readonly CitiesService.CitiesServiceClient _client;
    private readonly ILogger<CitiesGrpcClient> _logger;

    public CitiesGrpcClient(string grpcServerUrl, ILogger<CitiesGrpcClient> logger)
    {
        _channel = GrpcChannel.ForAddress(grpcServerUrl);
        _client = new CitiesService.CitiesServiceClient(_channel);
        _logger = logger;
    }

    public async Task<CitiesListgrpcDTO> GetAllCitiesAsync()
    {
        var sw = Stopwatch.StartNew();
        _logger.LogInformation("Cities gRPC Client: Starting GetCities call.");

        try
        {
            var response = await _client.GetCitiesAsync(new Empty());
            sw.Stop();
            _logger.LogInformation("Cities gRPC Client: Fetched {Count} cities in {ElapsedMs}ms", 
                response.Cities.Count, sw.ElapsedMilliseconds);
            return response;
        }
        catch (Exception ex)
        {
            sw.Stop();
            _logger.LogError(ex, "Cities gRPC Client Error: GetCities failed after {ElapsedMs}ms", sw.ElapsedMilliseconds);
            throw;
        }
    }

    public void Dispose() => _channel?.Dispose();
}