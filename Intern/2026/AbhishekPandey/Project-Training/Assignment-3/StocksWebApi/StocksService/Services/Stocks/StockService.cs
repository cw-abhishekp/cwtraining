using Microsoft.Extensions.Logging;
using StocksCommon.DTOs;
using StocksCommon.Entity;
using StocksCommon.Mappers;
using StocksRepository.Interfaces;
using StocksService.Business.ResponseStocks;
using StocksService.Interfaces;

namespace StocksService.Services
{
    public class StockService : IStockService
    {
        private readonly StocksMapper _stocksMapper;
        private readonly FilterMapper _filterMapper;

        private readonly IStockRepository _stockRepository;

        private readonly StocksResponseDTOMapper _stocksResponseDTOMapper;
        private readonly IResponseStocksLogic _responseStocksLogic;
        private readonly IResponseNextPage _responseNextPage;
        private readonly ILogger<StockService> _logger;
        
         public StockService(StocksMapper stocksMapper, FilterMapper filterMapper,
         IStockRepository stockRepository, StocksResponseDTOMapper stocksResponseDTOMapper,
         IResponseStocksLogic responseStocksLogic,IResponseNextPage responseNextPage,ILogger<StockService> logger)
        {
            _stocksMapper = stocksMapper;
            _filterMapper = filterMapper;
            _stockRepository = stockRepository;
            _stocksResponseDTOMapper = stocksResponseDTOMapper;
            _responseStocksLogic = responseStocksLogic;
            _responseNextPage =responseNextPage;
            _logger = logger;
        }


        public async  Task<StocksListResponseDTO> GetFilteredStocks(StocksRequestDTO stocksRequestDTO)
        {   
            Filter filter = _stocksMapper.MapToFilter(stocksRequestDTO);
            FilterDTO filterDTO = _filterMapper.ToDto(filter);

             _logger.LogInformation("Stocks Service: Fetch Stocks Request: MinBudget={Min}, MaxBudget={Max}, Page={Page}", 
                filterDTO.MinBudget, filterDTO.MaxBudget, filterDTO.Page);

            // this is an entity response that we are getting from repository layer
            var responseEntity = await _stockRepository.GetFilteredStocks(filterDTO);

            var res = _responseStocksLogic.BuildResponseList(responseEntity.Stocks);
            responseEntity.Stocks = await res;
            responseEntity.NextPageUrl = _responseNextPage.BuildNextPageUrl(filterDTO,responseEntity.TotalCount);

            _logger.LogInformation("Stocks Service: Returning {Count} stocks to client", responseEntity.Stocks?.Count ?? 0);
            
            var responseDTO = _stocksResponseDTOMapper.ToListDTO(responseEntity);
            return responseDTO;
        }
    }
}