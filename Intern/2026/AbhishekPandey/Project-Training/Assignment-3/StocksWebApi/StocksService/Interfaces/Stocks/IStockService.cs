using StocksCommon.DTOs;
using StocksCommon.Entity;

namespace StocksService.Interfaces
{
    public interface IStockService
    {
        Task<StocksListResponseDTO>  GetFilteredStocks(StocksRequestDTO stocksRequestDTO);
    }
}