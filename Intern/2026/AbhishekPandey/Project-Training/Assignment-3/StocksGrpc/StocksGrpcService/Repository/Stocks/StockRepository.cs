using System.Data;
using System.Diagnostics;
using StocksGrpcService.Entity;
using MySqlConnector;
using Dapper;
using StocksGrpcService.Common.Enums;
using StocksGrpcService.Common.ConstantVal;
using StocksGrpcService.Common.Queries;

namespace StocksGrpcService.Repository;

public class StockRepository : IStockRepository
{
    private readonly IConfiguration _iconfiguration;
    private readonly ILogger<StockRepository> _logger;
    private readonly string _connectionString;
    public StockRepository(IConfiguration iconfiguration, ILogger<StockRepository> logger)
    {
        _iconfiguration = iconfiguration;
        _logger = logger;
        _connectionString = _iconfiguration.GetConnectionString("MySqlDBString")
                             ?? throw new InvalidOperationException("DB Connection string is missing.");
    }

    public async Task<(List<StockEntity> Stocks, int TotalCount)> GetFilteredStocks(FilterEntity filter)
    {
        var sw = Stopwatch.StartNew();
        _logger.LogInformation("Database: Starting fetch for all stocks.");
        using var _mySqlConnection = new MySqlConnection(_connectionString);
        // var stocks = new List<StockEntity>();
        int totalCount = 0;
        try
        {
            await _mySqlConnection.OpenAsync();
            string sql = SqlQueries.BaseFilteredStocks;
            string filterSql = "";
            var parameters = new DynamicParameters();

            if (filter.FuelTypeIds?.Any() == true)
            {
                filterSql += " AND s.fuel IN @Fuels";
                parameters.Add("Fuels", filter.FuelTypeIds);
            }
            if (filter.MinBudget.HasValue && filter.MinBudget >= 0)
            {
                double minVal = filter.MinBudget.Value * 100000;
                if (minVal < int.MaxValue)
                {
                    int minInNumeric = Convert.ToInt32(minVal);
                    filterSql += " AND s.price_numeric >= @Min";
                    parameters.Add("Min", minInNumeric);
                }
            }

            if (filter.MaxBudget.HasValue && filter.MaxBudget >= 0)
            {
                double maxVal = filter.MaxBudget.Value * 100000;
                if (maxVal < int.MaxValue)
                {
                    int maxInNumeric = Convert.ToInt32(maxVal);
                    filterSql += " AND s.price_numeric <= @Max";
                    parameters.Add("Max", maxInNumeric);
                }
            }

            if (filter.MakeIds?.Any() == true)
            {
                filterSql += " AND s.make_id IN @Makes";
                parameters.Add("Makes", filter.MakeIds);
            }
            if (filter.CityIds?.Any() == true)
            {
                filterSql += " AND s.city_id IN @Cities";
                parameters.Add("Cities", filter.CityIds);
            }
            sql += filterSql;
            string countSql = SqlQueries.BaseStockCountQuery + filterSql;

            _logger.LogInformation("Database: Starting Count query execution. Filters: {Filters}", filterSql);
            totalCount = await _mySqlConnection.ExecuteScalarAsync<int>(countSql, parameters);
            _logger.LogInformation("Database: Count query completed. Total records found: {Count}", totalCount);

            // Handle Sorting
            string sortColumn = filter.SortByType switch
            {
                SortByType.PriceAsc => "s.price_numeric ASC",
                SortByType.PriceDesc => "s.price_numeric DESC",
                SortByType.YearAsc => "s.make_year ASC",
                SortByType.YearDesc => "s.make_year DESC",
                _ => "s.created_at DESC"
            };
            sql += $" ORDER BY {sortColumn}";

            // Handle Pagination
            sql += " LIMIT @Limit OFFSET @Offset";
            parameters.Add("Limit", ConstantVal.PageSize);
            parameters.Add("Offset", (filter.Page - 1) * ConstantVal.PageSize);

            _logger.LogInformation("Database: Starting Stock Fetch query.");
            var stocks = (await _mySqlConnection.QueryAsync<StockEntity>(sql, parameters)).ToList();

            if (stocks.Any())
            {
                var profileIds = stocks.Select(s => s.ProfileId).ToList();
                _logger.LogInformation("Database: Starting Stock Images Fetch query .");
                var images = (await _mySqlConnection.QueryAsync<ImageMappingDto>(SqlQueries.imageSql, new { Ids = profileIds })).ToList();
                var stockLookup = stocks.ToDictionary(s => s.ProfileId);
                foreach (var img in images)
                {
                    if (stockLookup.TryGetValue(img.ProfileId, out var stock))
                    {
                        stock.StockImages.Add(img.ImageUrl);
                    }
                }
            }
            sw.Stop();
            _logger.LogInformation("Database: Fetch completed. Total Count: {Count}, Time: {ElapsedMs}ms", totalCount, sw.ElapsedMilliseconds);
            return (stocks, totalCount);
        }
        catch (Exception ex)
        {
            sw.Stop();
            _logger.LogError(ex, "Database Error: GetFilteredStocks failed after {ElapsedMs}ms", sw.ElapsedMilliseconds);
            throw;
        }
    }

    private class ImageMappingDto
    {
        public long ProfileId { get; set; } = 0;
        public string ImageUrl { get; set; } = "";
    }
}