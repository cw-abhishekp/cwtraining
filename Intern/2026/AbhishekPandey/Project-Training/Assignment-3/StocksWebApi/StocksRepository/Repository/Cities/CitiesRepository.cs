using StocksCommon.Entity;
using StocksRepository.Clients;
using StocksRepository.Interfaces;
using StocksRepository.Mappers;
using Microsoft.Extensions.Logging;
using System.Diagnostics;

namespace StocksRepository.Repository;

public class CitiesRepository : ICitiesRepository
{
    private readonly ICitiesGrpcClient _cityGrpcClient;
    private readonly GrpcCitiesResponseMapper _cityMapper;
    private readonly ILogger<CitiesRepository> _logger;

    public CitiesRepository(ICitiesGrpcClient cityGrpcClient, GrpcCitiesResponseMapper cityMapper, ILogger<CitiesRepository> logger)
    {
        _cityGrpcClient = cityGrpcClient;
        _cityMapper = cityMapper;
        _logger = logger;
    }

    public async Task<List<CitiesResponseEnity>> GetAllCities()
    {
        _logger.LogInformation("Cities Repository: Requesting all cities from gRPC client.");

        try
        {
            var response = await _cityGrpcClient.GetAllCitiesAsync();
            
            var entities = _cityMapper.ToListEntity(response); 
        
            _logger.LogInformation("Cities Repository: Successfully mapped {Count} cities. ", entities.Count);
            
            return entities;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Cities Repository Error: Failed to fetch and map cities.");
            throw;
        }
    }
}