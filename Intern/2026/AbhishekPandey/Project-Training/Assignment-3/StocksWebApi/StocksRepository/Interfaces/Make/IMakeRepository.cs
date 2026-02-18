using StocksCommon.Entity;

namespace StocksRepository.Interfaces;

public interface IMakeRepository
{
Task<List<MakeResponseEntity>> GetAllMake();
}