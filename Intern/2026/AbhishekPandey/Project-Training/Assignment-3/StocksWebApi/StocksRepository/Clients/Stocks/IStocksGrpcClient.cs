using StocksCommon.Entity;
using StocksGrpcService.Protos;

namespace StocksRepository.Clients;

public interface IStocksGrpcClient : IDisposable
{
    Task<StocksListResponsegrpcDTO> GetFilteredStocksAsync(FiltergrpcDTO filtergrpcDTO);
}