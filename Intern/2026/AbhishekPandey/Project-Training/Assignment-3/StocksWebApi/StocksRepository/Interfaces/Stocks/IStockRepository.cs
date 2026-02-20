using StocksCommon.DTOs;
using StocksCommon.Entity;

namespace StocksRepository.Interfaces
{
    public interface IStockRepository
    {
        Task<StocksListResponseEntity> GetFilteredStocks(FilterDTO filterDTO);
    }
}