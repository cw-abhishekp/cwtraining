using Grpc.Core;
using Google.Protobuf.WellKnownTypes;
using StocksGrpcService.Protos;
using StocksGrpcService.Mappers;
using StocksGrpcService.Repository;

namespace StocksGrpcService.Services;

public class MakeServiceImpl : MakeService.MakeServiceBase
{
    private readonly IMakeRepository _makeRepository;
    private readonly MakeMapper _makeMapper;
    private readonly ILogger<MakeServiceImpl> _logger;

    public MakeServiceImpl(IMakeRepository makeRepository, MakeMapper makeMapper, ILogger<MakeServiceImpl> logger)
    {
        _makeRepository = makeRepository;
        _makeMapper = makeMapper;
        _logger = logger;
    }

    public override async Task<MakeListgrpcDTO> GetMake(Empty request, ServerCallContext context)
    {
        _logger.LogInformation("Make gRPC Service: Fetching all car makes.");
        
        var makeEntities = await _makeRepository.GetAllMakes();
        var response = _makeMapper.ToProtoList(makeEntities);

        _logger.LogInformation("Make gRPC Service: Returning {Count} makes.", response.Make.Count);
        return response;
    }
}