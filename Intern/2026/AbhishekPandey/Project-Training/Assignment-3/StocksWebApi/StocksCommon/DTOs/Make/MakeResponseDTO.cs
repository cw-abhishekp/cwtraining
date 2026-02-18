namespace StocksCommon.DTOs;

public class MakeResponseDTO
{
    public int MakeId { get; set; }
    public string MakeName { get; set; } = string.Empty;
}

// public class MakeListResponseDTO
// {
//     public List<MakeResponseDTO> Makes { get; set; } = new();
// }