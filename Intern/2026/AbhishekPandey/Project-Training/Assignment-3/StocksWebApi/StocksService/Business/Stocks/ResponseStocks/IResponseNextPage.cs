using StocksCommon.DTOs;

namespace StocksService.Business.ResponseStocks;

public interface IResponseNextPage 
{
    public string? BuildNextPageUrl(FilterDTO filter,long totalCount);
}