using StocksGrpcService.Protos;

namespace StocksRepository.Clients;

public interface IMakeGrpcClient : IDisposable
{
Task<MakeListgrpcDTO> GetAllMakeAsync();
}