using Microsoft.Extensions.Logging;
using StocksCommon.DTOs;
using StocksCommon.Mappers;
using StocksRepository.Interfaces;
using StocksService.Interfaces;

namespace StocksService.Services;

public class CitiesService : ICitiesService
{
    private readonly ICitiesRepository _citiesRepository;
    private readonly CitiesMapper _citiesMapper;
    private readonly ILogger<CitiesService> _logger;

    public CitiesService(ICitiesRepository citiesRepository, CitiesMapper citiesMapper, ILogger<CitiesService> logger)
    {
        _citiesRepository = citiesRepository;
        _citiesMapper = citiesMapper;
        _logger = logger;
    }

    public async Task<List<CitiesResponseDTO>> GetAllCities()
    {
        _logger.LogInformation("Cities Service: Fetching all cities from repository.");

        var cityEntities = await _citiesRepository.GetAllCities();

        _logger.LogDebug("Cities Service: Retrieved {Count} city entities from repository.", cityEntities?.Count ?? 0);

        var responseDTO = _citiesMapper.ToDTOList(cityEntities);

        _logger.LogInformation("Cities Service: Returning {Count} mapped City DTOs.", responseDTO?.Count ?? 0);
        
        return responseDTO;
    }
}