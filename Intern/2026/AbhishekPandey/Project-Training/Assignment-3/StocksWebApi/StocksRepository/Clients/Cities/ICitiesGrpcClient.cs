using StocksGrpcService.Protos;

namespace StocksRepository.Clients;

public interface ICitiesGrpcClient : IDisposable
{
 Task<CitiesListgrpcDTO> GetAllCitiesAsync();
}