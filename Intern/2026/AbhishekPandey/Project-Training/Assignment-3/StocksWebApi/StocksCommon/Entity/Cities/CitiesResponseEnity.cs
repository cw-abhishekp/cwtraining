namespace StocksCommon.Entity;

public class CitiesResponseEnity
{
    public int CityId { get; set; }
    public string CityName { get; set; } = string.Empty;
    public bool IsPopular { get; set; }
}

// public class CitiesListResponseEntity
// {
//     public List<CitiesResponseEnity> Cities { get; set; } = new();
// }