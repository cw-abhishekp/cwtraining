 using Microsoft.Extensions.Logging;
using StocksCommon.DTOs;
using StocksCommon.Mappers;
using StocksRepository.Interfaces;
using StocksService.Interfaces;

namespace StocksService.Services;

public class MakeService : IMakeService
{
    private readonly IMakeRepository _makeRepository;
    private readonly MakeMapper _makeMapper;
    private readonly ILogger<MakeService> _logger;

    public MakeService(IMakeRepository makeRepository, MakeMapper makeMapper, ILogger<MakeService> logger)
    {
        _makeRepository = makeRepository;
        _makeMapper = makeMapper;
        _logger = logger;
    }

    public async Task<List<MakeResponseDTO>> GetAllMake()
    {
        _logger.LogInformation("Make Service: Fetching all car makes from repository.");

        var makeEntities = await _makeRepository.GetAllMake();
        
        _logger.LogDebug("Make Service: Retrieved {Count} make entities from repository.", makeEntities?.Count ?? 0);

        var responseDTO = _makeMapper.ToDTOList(makeEntities);
        
        _logger.LogInformation("Make Service: Returning {Count} mapped Make DTOs.", responseDTO?.Count ?? 0);
        
        return responseDTO;
    }
}