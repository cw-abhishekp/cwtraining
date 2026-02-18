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
    
    public StocksGrpcClient(string grpcServerUrl,ILogger<StocksGrpcClient> logger)
    {
        _channel = GrpcChannel.ForAddress(grpcServerUrl);
        _client = new StockService.StockServiceClient(_channel);
        _logger = logger;
    }

    public async Task<StocksListResponsegrpcDTO> GetFilteredStocksAsync(FiltergrpcDTO filtergrpcDTO)
    {
        _logger.LogDebug("gRPC Client: Calling GetFilteredStocksAsync...");
        return await _client.GetFilteredStocksAsync(filtergrpcDTO);
    }

    public void Dispose()
    {
        _channel?.Dispose();
    }
}