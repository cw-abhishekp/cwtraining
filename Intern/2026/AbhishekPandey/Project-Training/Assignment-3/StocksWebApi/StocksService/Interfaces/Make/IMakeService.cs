using StocksCommon.DTOs;

namespace StocksService.Interfaces;

public interface IMakeService
{
Task<List<MakeResponseDTO>> GetAllMake();
}