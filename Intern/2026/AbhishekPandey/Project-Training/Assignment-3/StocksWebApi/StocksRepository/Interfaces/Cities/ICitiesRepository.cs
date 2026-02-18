using StocksCommon.Entity;

namespace StocksRepository.Interfaces;
public interface ICitiesRepository
{
Task<List<CitiesResponseEnity>> GetAllCities();
}