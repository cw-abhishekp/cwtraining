using System.Globalization;
using StocksCommon.Entity;

namespace StocksService.Business.ResponseStocks;

public class ResponseStocksLogic : IResponseStocksLogic
{
    public async Task<StocksResponseEntity> BuildResponse(StocksResponseEntity stock)
    {
        if (stock == null) return null;
        stock.Price = ResponseStocksLogic.FormatPrice(stock.PriceNumeric);
        stock.Km = ResponseStocksLogic.FormatKm(stock.KmNumeric);
        stock.EmiText = $"EMI Starts at {ResponseStocksLogic.FormatEmiText(stock.EmiPrice)}";
        stock.CarName = ResponseStocksLogic.BuildCarName(stock.MakeYear, stock.MakeName, stock.ModelName, stock.VersionName);
        stock.IsValueForMoney = ResponseStocksLogic.IsValueForMoney(stock.KmNumeric, stock.PriceNumeric);
        return stock;
    }

    public async Task<List<StocksResponseEntity>> BuildResponseList(List<StocksResponseEntity> stocks)
    {
        var tasks = stocks.Select(BuildResponse);
        var results = await Task.WhenAll(tasks);
        return results.ToList();
    }

    public static string FormatPrice(int amount)
    {
        if (amount >= 10000000) // 1 Crore
        {
            return $"{amount / 10000000.0:0.##} Crore";
        }
        else if (amount >= 100000) // 1 Lakh
        {
            return $"{amount / 100000.0:0.##} Lakh";
        }
        else
        {
            return $"{amount:N0}";
        }
    }

    public static string FormatKm(int km)
    {
        return km.ToString("N0", new CultureInfo("en-IN"));
    }

    public static string FormatEmiText(int amount)
    {
        if (amount >= 10000000)
        {
            return $"₹{amount / 10000000.0:0.##} Crore";
        }
        else if (amount >= 100000)
        {
            return $"₹{amount / 100000.0:0.##} Lakh";
        }
        else
        {
            return $"₹{amount.ToString("N0")}";
        }
    }


    public static string BuildCarName(int year, string make, string? model, string? version)
    {
        var parts = new List<string>();
        parts.Add(year.ToString());
        if (!string.IsNullOrWhiteSpace(make))
            parts.Add(make);
        if (!string.IsNullOrWhiteSpace(model))
            parts.Add(model);
        if (!string.IsNullOrWhiteSpace(version))
            parts.Add(version);
        return string.Join(" ", parts);
    }

    public static bool IsValueForMoney(int KmNumeric, double PriceNumeric)
    {
        return KmNumeric < 10000 && PriceNumeric < 2;
    }
}