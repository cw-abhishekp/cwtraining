using Riok.Mapperly.Abstractions;
using StocksCommon.Entity;
using StocksGrpcService.Protos;

[Mapper]
public partial class GrpcMakeResponseMapper
{
    public partial MakeResponseEntity ToEntity(MakegrpcDTO proto);

    public List<MakeResponseEntity> ToListEntity(MakeListgrpcDTO response)
    {
        return response.Make.Select(ToEntity).ToList();
    }
}