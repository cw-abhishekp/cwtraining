using System.Diagnostics;
using Google.Protobuf.WellKnownTypes;
using Grpc.Net.Client;
using Microsoft.Extensions.Logging;
using StocksCommon.DTOs;
using StocksGrpcService.Protos;

namespace StocksRepository.Clients;

public class StocksGrpcClient : IStocksGrpcClient, IDisposable
{
    private readonly GrpcChannel _channel;
    private readonly StockService.StockServiceClient _client;

    private readonly ILogger<StocksGrpcClient> _logger;

    public StocksGrpcClient(string grpcServerUrl, ILogger<StocksGrpcClient> logger)
    {
        _channel = GrpcChannel.ForAddress(grpcServerUrl);
        _client = new StockService.StockServiceClient(_channel);
        _logger = logger;
    }

    public async Task<StocksListResponsegrpcDTO> GetFilteredStocksAsync(FiltergrpcDTO filtergrpcDTO)
    {
        var sw = Stopwatch.StartNew();
        _logger.LogInformation("Stocks gRPC Client:  Starting GetFilteredStocks call.");

        try
        {
            var response = await _client.GetFilteredStocksAsync(filtergrpcDTO);
            sw.Stop();
            _logger.LogInformation("Stocks gRPC Client: Received {Count} stocks in {ElapsedMs}ms",
                response.Stocks.Count, sw.ElapsedMilliseconds);
            return response;
        }
        catch (Exception ex)
        {
            sw.Stop();
            _logger.LogError(ex, "Stocks gRPC Client Error: GetFilteredStocksAsync failed after {ElapsedMs}ms", sw.ElapsedMilliseconds);
            throw;
        }
    }

    public void Dispose()
    {
        _channel?.Dispose();
    }
}