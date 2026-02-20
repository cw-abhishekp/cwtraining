namespace StocksGrpcService.Entity;

public class StockEntity
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

    public int TotalCount {get;set;}
}


