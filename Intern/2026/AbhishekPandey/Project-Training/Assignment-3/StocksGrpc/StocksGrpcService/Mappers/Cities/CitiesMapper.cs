using Riok.Mapperly.Abstractions;
using StocksGrpcService.Entity;
using StocksGrpcService.Protos;

namespace StocksGrpcService.Mappers;

[Mapper]
public partial class CitiesMapper
{
    public partial CitiesgrpcDTO ToProto(CitiesEntity entity);

    public CitiesListgrpcDTO ToProtoList(List<CitiesEntity> entities)
    {
        var response = new CitiesListgrpcDTO();
        
        foreach (var city in entities)
        {
            response.Cities.Add(ToProto(city));
        }
        
        return response;
    }
}