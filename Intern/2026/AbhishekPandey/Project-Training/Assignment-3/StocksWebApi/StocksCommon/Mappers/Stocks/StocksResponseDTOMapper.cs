using Riok.Mapperly.Abstractions;
using StocksCommon.Entity;
using StocksCommon.DTOs;

namespace StocksCommon.Mappers
{
    [Mapper]
    public partial class StocksResponseDTOMapper
    {
        public partial StocksResponseDTO ToDTO(StocksResponseEntity entity);
        public partial List<StocksResponseDTO> ToDTOList(List<StocksResponseEntity> entities);
        public StocksListResponseDTO ToListDTO(StocksListResponseEntity entity)
        {
            return new StocksListResponseDTO
            {
                Stocks = ToDTOList(entity.Stocks),
                TotalCount = entity.TotalCount,
                NextPageUrl = entity.NextPageUrl
            };
        }
    }
}