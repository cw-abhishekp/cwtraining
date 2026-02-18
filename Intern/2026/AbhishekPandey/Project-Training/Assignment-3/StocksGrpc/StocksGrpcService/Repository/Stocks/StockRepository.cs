using System.Data;
using StocksGrpcService.Entity;
using Microsoft.Extensions.Logging;
using MySqlConnector;
using Dapper;
using StocksGrpcService.Common.Queries;
using StocksGrpcService.Mappers;
using StocksGrpcService.Common.ConstantVal;
using StocksGrpcService.Common.Enums;
using System.Reflection.Metadata;
using Microsoft.VisualBasic;
using System.Diagnostics;

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
        var stocks = new List<StockEntity>();
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

            _logger.LogInformation("Database: Starting Stock Fetch query. filter: {filter}", filter);
            var result = await _mySqlConnection.QueryAsync<dynamic>(sql, parameters);
            foreach (var row in result)
            {
                stocks.Add(new StockEntity
                {
                    ProfileId = row.ProfileId?.ToString() ?? "",
                    MakeId = row.MakeId != null ? (int)row.MakeId : 0,
                    MakeName = row.MakeName ?? "",
                    CityId = row.CityId != null ? (int)row.CityId : 0,
                    CityName = row.CityName ?? "",
                    VersionName = row.VersionName ?? "",
                    KmNumeric = row.KmNumeric != null ? (int)row.KmNumeric : 0,
                    Fuel = Enum.GetName(typeof(FuelType), (int)row.FuelInt) ?? "Petrol",
                    MakeYear = row.MakeYear != null ? (int)row.MakeYear : 0,
                    ModelName = row.ModelName ?? "",
                    PriceNumeric = row.PriceNumeric != null ? (int)row.PriceNumeric : 0,
                    EmiPrice = row.EmiPrice != null ? (int)row.EmiPrice : 0,
                    StockImages = new List<string>()
                });
            }

            // Populate Images
            if (stocks.Any())
            {
                var profileIds = stocks.Select(s => s.ProfileId).ToList();
                var images = await _mySqlConnection.QueryAsync<dynamic>(SqlQueries.imageSql, new { Ids = profileIds });
                var stockLookup = stocks.ToDictionary(s => s.ProfileId!);

                foreach (var img in images)
                {
                    string dbId = img.profile_id.ToString();
                    if (stockLookup.TryGetValue(dbId, out var stock))
                    {
                        stock.StockImages.Add(img.image_url ?? "");
                    }
                }
            }
            sw.Stop();
            _logger.LogInformation("Database: Fetch completed. Total Count: {Count}, Time: {ElapsedMs}ms", totalCount, sw.ElapsedMilliseconds);
        }
        catch (Exception ex)
        {
            sw.Stop();
            _logger.LogError(ex, "Database Error: GetFilteredStocks failed after {ElapsedMs}ms", sw.ElapsedMilliseconds);
            throw;
        }

        return (stocks, totalCount);
    }
}






// public async Task<List<StockEntity>> GetFilteredStocks(FilterEntity filter)
// {
//     using var _mySqlConnection = new MySqlConnection(_connectionString);
//     List<StockEntity> stocks = new List<StockEntity>();

//     try
//     {
// if (_mySqlConnection.State != ConnectionState.Open)
// {
//     await _mySqlConnection.OpenAsync();
//     _logger.LogInformation("Database connection opened successfully.");
// }

//         //      var parameters = new
//         //     {
//         //         FuelTypeIds = filter.FuelTypeIds,
//         //         MinBudget = filter.MinBudget,
//         //         MaxBudget = filter.MaxBudget,
//         //         MakeIds = filter.MakeIds,
//         //         CityIds = filter.CityIds,
//         //         SortByType = (int)filter.SortByType,
//         //         PageSize = filter.PageSize,
//         //         Offset = (filter.Page - 1) * filter.PageSize
//         //     };


//         //     stocks = (await _mySqlConnection.QueryAsync<StockEntity>(
//         //         SqlQueries.SelectFilteredStocks,
//         //         parameters
//         //     )).ToList();


//         //    _logger.LogInformation($"Retrieved {stocks.Count} stocks from database.");


//         stocks = new List<StockEntity>
//     {
//         new StockEntity
//         {
//             ProfileId = "101",
//             MakeId = 1,
//             MakeName = "Maruti Suzuki",
//             CityId = 6,
//             CityName = "Mumbai",
//             VersionName = "VXI",
//             KmNumeric = 25000,
//             Fuel = "Petrol",
//             MakeYear = 2020,
//             ModelName = "Swift",
//             PriceNumeric = 550000,
//             EmiPrice = 12000,
//             StockImages = new List<string>
//             {
//                 "https://imgd.aeplcdn.com/400x300/blur/image/ln8s84e6x9cq.jpg",
//                 "https://imgd.aeplcdn.com/400x300/blur/image/5noai4dy729c.jpg"
//             }
//         },
//         new StockEntity
//         {
//             ProfileId = "102",
//             MakeId = 2,
//             MakeName = "Hyundai",
//             CityId = 2,
//             CityName = "Delhi",
//             VersionName = "Sportz",
//             KmNumeric = 18000,
//             Fuel = "Diesel",
//             MakeYear = 2021,
//             ModelName = "i20",
//             PriceNumeric = 920000,
//             EmiPrice = 15890,
//             StockImages = new List<string>
//             {
//                 "https://imgd.aeplcdn.com/400x300/blur/image/abc123.jpg"
//             }
//         },
//         new StockEntity
//         {
//             ProfileId = "103",
//             MakeId = 5,
//             MakeName = "Honda",
//             CityId = 3,
//             CityName = "Bangalore",
//             VersionName = "VX",
//             KmNumeric = 42000,
//             Fuel = "Petrol",
//             MakeYear = 2019,
//             ModelName = "City",
//             PriceNumeric = 1080000,
//             EmiPrice = 18650,
//             StockImages = new List<string>
//             {
//                 "https://imgd.aeplcdn.com/400x300/blur/image/xyz789.jpg",
//                 "https://imgd.aeplcdn.com/400x300/blur/image/pqr456.jpg",
//                 "https://imgd.aeplcdn.com/400x300/blur/image/lmn012.jpg"
//             }
//         },
//         new StockEntity
//         {
//             ProfileId = "104",
//             MakeId = 2,
//             MakeName = "Hyundai",
//             CityId = 2,
//             CityName = "Delhi",
//             VersionName = "Sportz Elite",
//             KmNumeric = 18000,
//             Fuel = "Diesel",
//             MakeYear = 2021,
//             ModelName = "i20",
//             PriceNumeric = 923000,
//             EmiPrice = 15890,
//             StockImages = new List<string>()
//         }
//     };
//     }
//     catch (Exception ex)
//     {
//         _logger.LogError(ex, "Error opening database connection");
//         throw;
//     }
//     finally
//     {
//         if (_mySqlConnection.State == ConnectionState.Open)
//         {
//             _mySqlConnection.Close();
//             _mySqlConnection.Dispose();
//             _logger.LogInformation("Database connection closed.");
//         }
//     }
//     return stocks;
// }
