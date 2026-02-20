namespace StocksCommon.DTOs;

public class StocksResponseDTO
{
    public long ProfileId { get; set; }
    public int MakeId { get; set; }
    public string MakeName { get; set; } = string.Empty;
    public int CityId { get; set; }
    public string CityName { get; set; } = string.Empty;
    public string? VersionName { get; set; }
    public int KmNumeric { get; set; }
    public string Fuel { get; set; } = string.Empty;
    public int MakeYear { get; set; }
    public string? ModelName { get; set; }

    public int PriceNumeric { get; set; }
    public int EmiPrice { get; set; }

    public List<string> StockImages { get; set; } = new();


    // extra parmaters that we are going to construct
    public string? Price {get; set;}
    public string? EmiText {get; set;}
    public string? Km {get; set;}
    public string? CarName {get; set;}
    public bool? IsValueForMoney {get; set;}
}



public class StocksListResponseDTO
{
    public List<StocksResponseDTO> Stocks { get; set; } = new();
    public long TotalCount { get; set; }
    public string? NextPageUrl { get; set; }
}