using Grpc.Core;
using StocksGrpcService.Protos;
using StocksGrpcService.Mappers;
using StocksGrpcService.Repository;

namespace StocksGrpcService.Services;

public class StocksServiceImpl : StockService.StockServiceBase
{
    private readonly IStockRepository _stockRepository;
    private readonly ProtoMapper _protoMapper;
    private readonly ILogger<StocksServiceImpl> _logger;

    public StocksServiceImpl(IStockRepository stockRepository, ProtoMapper protoMapper, ILogger<StocksServiceImpl> logger)
    {
        _stockRepository = stockRepository;
        _protoMapper = protoMapper;
        _logger = logger;
    }

    public override async Task<StocksListResponsegrpcDTO> GetFilteredStocks(FiltergrpcDTO request, ServerCallContext context)
    {
        _logger.LogInformation("Stocks gRPC Service: Processing GetFilteredStocks. Request: {request}", request);

        var (stocks, totalCount) = await _stockRepository.GetFilteredStocks(
            _protoMapper.ToFilterEntity(request)
        );

        var response = _protoMapper.ToProtoListResponse(stocks, totalCount);

        _logger.LogInformation("Stocks gRPC Service: Returning {Count} stocks out of {Total}.", response.Stocks.Count, response.TotalCount);
        return response;
    }
}