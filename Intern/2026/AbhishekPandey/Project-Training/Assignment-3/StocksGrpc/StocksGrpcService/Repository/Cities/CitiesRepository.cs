using System.Data;
using StocksGrpcService.Entity;
using Microsoft.Extensions.Logging;
using MySqlConnector;
using Dapper;
using StocksGrpcService.Common.Queries;
using System.Diagnostics;

namespace StocksGrpcService.Repository;

public class CitiesRepository : ICitiesRepository
{
    private readonly IConfiguration _iconfiguration;
    private readonly ILogger<CitiesRepository> _logger;
    private readonly string _connectionString;

    public CitiesRepository(IConfiguration iconfiguration, ILogger<CitiesRepository> logger)
    {
        _iconfiguration = iconfiguration;
        _logger = logger;
       _connectionString = _iconfiguration.GetConnectionString("MySqlDBString") 
                            ?? throw new InvalidOperationException("DB Connection string is missing.");
    }

    public async Task<List<CitiesEntity>> GetAllCities()
    {
        _logger.LogInformation("Database: Starting fetch for all cities.");
        var sw = Stopwatch.StartNew();
        using var connection = new MySqlConnection(_connectionString);
        try
        {
            await connection.OpenAsync();
            _logger.LogInformation("Database: Starting Cities query execution.");

            var result = await connection.QueryAsync<CitiesEntity>(SqlQueries.SelectAllCities);
            
            var cityList =  result.ToList();

            sw.Stop();
          _logger.LogInformation("Database: Successfully fetched {Count} cities in {ElapsedMs}ms",  cityList.Count, sw.ElapsedMilliseconds);
                
            return cityList;
        }
        catch (Exception ex)
        {
           sw.Stop();
            _logger.LogError(ex, "Database Error: Failed to fetch cities after {ElapsedMs}ms", sw.ElapsedMilliseconds);
            throw;
        }
    }
}