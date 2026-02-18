using StocksCommon.Constants;
using StocksCommon.DTOs;

namespace StocksService.Business.ResponseStocks;

public class ResponseNextPage : IResponseNextPage
{
     public string? BuildNextPageUrl(FilterDTO filter,long totalCount)
    {
        if (filter.Page * Constants.PageSize >= totalCount)
            return null;

        int nextPage = filter.Page + 1;

        var queryParams = new List<string>();

        if (filter.MakeIds?.Any() == true)
            queryParams.Add($"car={string.Join("+", filter.MakeIds)}");

        if (filter.MinBudget.HasValue && filter.MaxBudget.HasValue)
            queryParams.Add($"budget={filter.MinBudget}-{filter.MaxBudget}");

        if (filter.CityIds?.Any() == true)
            queryParams.Add($"city={string.Join("+", filter.CityIds)}");

        if (filter.FuelTypeIds?.Any() == true)
            queryParams.Add($"fuel={string.Join("+", filter.FuelTypeIds)}");

        queryParams.Add($"page={nextPage}");
        // queryParams.Add($"pagesize={Constants.PageSize}");
        queryParams.Add($"sortby={filter.SortByType.ToString().ToLower()}");
        return $"{Constants.StocksURL}?{string.Join("&", queryParams)}";
}
}