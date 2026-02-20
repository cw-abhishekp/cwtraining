using StocksGrpcService.Entity;
namespace StocksGrpcService.Repository;

public interface IMakeRepository
{
    Task<List<MakeEntity>> GetAllMakes();
}