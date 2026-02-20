using Riok.Mapperly.Abstractions;
using StocksCommon.Entity;
using StocksCommon.DTOs;

namespace StocksCommon.Mappers
{
    [Mapper]
    public partial class MakeMapper
    {
        public partial MakeResponseDTO ToDTO(MakeResponseEntity entity);

        public partial List<MakeResponseDTO> ToDTOList(List<MakeResponseEntity> entities);

        // public MakeListResponseDTO ToListDTO(List<MakeResponseEntity> entities)
        // {
        //     return new MakeListResponseDTO
        //     {
        //         Makes = ToDTOList(entities)
        //     };
        // }
    }
}