using StocksCommon.DTOs;

namespace StocksService.Interfaces;

public interface ICitiesService
{
Task<List<CitiesResponseDTO>> GetAllCities();
}