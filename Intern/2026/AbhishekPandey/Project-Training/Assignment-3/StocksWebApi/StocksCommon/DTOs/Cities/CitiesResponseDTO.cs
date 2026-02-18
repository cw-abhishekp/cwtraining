namespace StocksCommon.DTOs;

public class CitiesResponseDTO
{
    public int CityId { get; set; }
    public string CityName { get; set; } = string.Empty;
    public bool IsPopular { get; set; }
}

// public class CitiesListResponseDTO
// {
//     public List<CitiesResponseDTO> Cities { get; set; } = new();
// }