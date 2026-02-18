using Grpc.Core;
using Google.Protobuf.WellKnownTypes;
using StocksGrpcService.Protos;
using StocksGrpcService.Mappers;
using StocksGrpcService.Repository;

namespace StocksGrpcService.Services;

public class CitiesServiceImpl : CitiesService.CitiesServiceBase
{
    private readonly ICitiesRepository _citiesRepository;
    private readonly CitiesMapper _citiesMapper;
    private readonly ILogger<CitiesServiceImpl> _logger;

    public CitiesServiceImpl(ICitiesRepository citiesRepository, CitiesMapper citiesMapper, ILogger<CitiesServiceImpl> logger)
    {
        _citiesRepository = citiesRepository;
        _citiesMapper = citiesMapper;
        _logger = logger;
    }

    public override async Task<CitiesListgrpcDTO> GetCities(Empty request, ServerCallContext context)
    {
        _logger.LogInformation("Cities gRPC Service: Fetching all cities.");

        var cityEntities = await _citiesRepository.GetAllCities();
        var response = _citiesMapper.ToProtoList(cityEntities);

        _logger.LogInformation("Cities gRPC Service: Returning {Count} cities.", response.Cities.Count);
        return response;
    }
}