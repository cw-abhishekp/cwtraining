using StocksCommon.Entity;
using StocksRepository.Clients;
using StocksRepository.Interfaces;
using StocksRepository.Mappers;
using Microsoft.Extensions.Logging;
using System.Diagnostics;

namespace StocksRepository.Repository;

public class MakeRepository : IMakeRepository
{
    private readonly IMakeGrpcClient _makeGrpcClient;
    private readonly GrpcMakeResponseMapper _makeMapper;
    private readonly ILogger<MakeRepository> _logger;

    public MakeRepository(IMakeGrpcClient makeGrpcClient, GrpcMakeResponseMapper makeMapper, ILogger<MakeRepository> logger)
    {
        _makeGrpcClient = makeGrpcClient;
        _makeMapper = makeMapper;
        _logger = logger;
    }

    public async Task<List<MakeResponseEntity>> GetAllMake()
    {
        _logger.LogInformation("Make Repository: Requesting all makes from gRPC client.");

        try
        {
            var response = await _makeGrpcClient.GetAllMakeAsync();
            var entities = _makeMapper.ToListEntity(response);
            
            _logger.LogInformation("Make Repository: Successfully mapped {Count}. ", entities.Count);
            
            return entities;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Make Repository Error: Failed to fetch and map makes. ");
            throw;
        }
    }
}