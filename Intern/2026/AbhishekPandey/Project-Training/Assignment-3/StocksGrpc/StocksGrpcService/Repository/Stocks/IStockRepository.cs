using StocksGrpcService.Entity;

namespace StocksGrpcService.Repository
{
    public interface IStockRepository
    {
        Task<(List<StockEntity> Stocks, int TotalCount)> GetFilteredStocks(FilterEntity filter);
    }
}