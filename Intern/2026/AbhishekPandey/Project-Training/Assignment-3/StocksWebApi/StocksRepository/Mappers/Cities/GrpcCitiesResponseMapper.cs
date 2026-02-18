using Riok.Mapperly.Abstractions;
using StocksCommon.Entity;
using StocksGrpcService.Protos;

[Mapper]
public partial class GrpcCitiesResponseMapper
{
    public partial CitiesResponseEnity ToEntity(CitiesgrpcDTO proto);

    public List<CitiesResponseEnity> ToListEntity(CitiesListgrpcDTO response)
    {
        // Note: response.Cities matches the 'repeated' field name in your proto
        return response.Cities.Select(ToEntity).ToList();
    }
}