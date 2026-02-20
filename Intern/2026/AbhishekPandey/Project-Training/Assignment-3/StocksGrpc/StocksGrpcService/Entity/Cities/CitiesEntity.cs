namespace StocksGrpcService.Entity;

public class CitiesEntity
{
    public int CityId { get; set; }
    public string CityName { get; set; } = string.Empty;
    public bool IsPopular { get; set; }
}