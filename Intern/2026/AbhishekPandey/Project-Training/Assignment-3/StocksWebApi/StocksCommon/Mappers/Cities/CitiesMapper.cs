using Riok.Mapperly.Abstractions;
using StocksCommon.Entity;
using StocksCommon.DTOs;

namespace StocksCommon.Mappers
{
    [Mapper]
    public partial class CitiesMapper
    {
        public partial CitiesResponseDTO ToDTO(CitiesResponseEnity entity);

        public partial List<CitiesResponseDTO> ToDTOList(List<CitiesResponseEnity> entities);

        // public CitiesListResponseDTO ToListDTO(List<CitiesResponseEnity> entities)
        // {
        //     return new CitiesListResponseDTO
        //     {
        //         Cities = ToDTOList(entities)
        //     };
        // }
    }
}