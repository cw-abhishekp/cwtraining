
using Microsoft.Extensions.Logging;
using StocksCommon.DTOs;
using StocksCommon.Entity;
using StocksGrpcService.Protos;
using StocksRepository.Clients;
using StocksRepository.Interfaces;
using StocksRepository.Mappers;

namespace StocksRepository.Repository
{

    public class StockRepository : IStockRepository
    {
       private readonly IStocksGrpcClient _grpcClient;
        private readonly FiltergrpcMapper _filtergrpcMapper;
        private readonly GrpcResponseMapper _grpcResponseMapper;

        private readonly ILogger<StockRepository> _logger;
       public StockRepository(IStocksGrpcClient grpcClient,FiltergrpcMapper filtergrpcMapper, GrpcResponseMapper grpcResponseMapper,ILogger<StockRepository> logger)
        {
            _grpcClient = grpcClient;
            _filtergrpcMapper = filtergrpcMapper;
            _grpcResponseMapper = grpcResponseMapper;
            _logger =logger;
        }

        public async  Task<StocksListResponseEntity>  GetFilteredStocks(FilterDTO filterDTO)
        {

            _logger.LogInformation("Stocks Repository: Initiating gRPC call for filtered stocks. Budget: {Min}-{Max}", 
                filterDTO.MinBudget, filterDTO.MaxBudget);

            FiltergrpcDTO filtergrpcDTO = _filtergrpcMapper.ToFilterRequest(filterDTO);
            
            var res = await _grpcClient.GetFilteredStocksAsync(filtergrpcDTO);

            var stocksResponseEntities = _grpcResponseMapper.ToListEntity(res);
            
            _logger.LogInformation("Stocks Repository: gRPC call successful. Received {Count} entities.", 
                stocksResponseEntities.Stocks?.Count ?? 0);
                
            return stocksResponseEntities;
        }
    }
}