using System.Data;
using StocksGrpcService.Entity;
using Microsoft.Extensions.Logging;
using MySqlConnector;
using Dapper;
using StocksGrpcService.Common.Queries;
using System.Diagnostics;

namespace StocksGrpcService.Repository;

public class MakeRepository : IMakeRepository
{
    private readonly IConfiguration _iconfiguration;
    private readonly ILogger<MakeRepository> _logger;
    private readonly string _connectionString;

    public MakeRepository(IConfiguration iconfiguration, ILogger<MakeRepository> logger)
    {
        _iconfiguration = iconfiguration;
        _logger = logger;
       _connectionString = _iconfiguration.GetConnectionString("MySqlDBString") 
                            ?? throw new InvalidOperationException("DB Connection string is missing.");
    }

    public async Task<List<MakeEntity>> GetAllMakes()
    {
        _logger.LogInformation("Database: Starting fetch for all car makes.");
        var sw = Stopwatch.StartNew();

        using var connection = new MySqlConnection(_connectionString);
        try
        {
            await connection.OpenAsync();
            _logger.LogInformation("Database: Starting Makes query execution.");
            var result = await connection.QueryAsync<MakeEntity>(SqlQueries.SelectAllMakes);
            var makeList = result.ToList();
            sw.Stop();
            _logger.LogInformation("Database: Successfully fetched {Count} makes in {ElapsedMs}ms",makeList.Count, sw.ElapsedMilliseconds);
            return makeList;
        }
        catch (Exception ex)
        {
            sw.Stop();
          _logger.LogError(ex, "Database Error: Failed to fetch car makes after {ElapsedMs}ms", sw.ElapsedMilliseconds);
            throw;
        }
    }
}