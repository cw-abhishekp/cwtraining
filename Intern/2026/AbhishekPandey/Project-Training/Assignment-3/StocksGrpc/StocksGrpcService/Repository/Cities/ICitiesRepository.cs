using StocksGrpcService.Entity;

namespace StocksGrpcService.Repository;
public interface ICitiesRepository
{
    Task<List<CitiesEntity>> GetAllCities();
}