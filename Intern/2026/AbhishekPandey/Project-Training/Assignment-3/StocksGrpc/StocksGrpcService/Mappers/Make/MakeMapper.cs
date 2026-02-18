using Riok.Mapperly.Abstractions;
using StocksGrpcService.Entity;
using StocksGrpcService.Protos;

namespace StocksGrpcService.Mappers;

[Mapper]
public partial class MakeMapper
{
    public partial MakegrpcDTO ToProto(MakeEntity entity);

    public MakeListgrpcDTO ToProtoList(List<MakeEntity> entities)
    {
        var response = new MakeListgrpcDTO();

        foreach (var make in entities)
        {
            response.Make.Add(ToProto(make));
        }

        return response;
    }
}