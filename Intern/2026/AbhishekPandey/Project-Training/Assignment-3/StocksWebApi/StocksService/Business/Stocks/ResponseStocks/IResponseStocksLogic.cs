using StocksCommon.Entity;

namespace StocksService.Business.ResponseStocks;

public interface IResponseStocksLogic
{
    public Task<StocksResponseEntity> BuildResponse(StocksResponseEntity stock);
    public Task< List<StocksResponseEntity>> BuildResponseList(List<StocksResponseEntity> stocks);
}