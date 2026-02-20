using StocksCommon.Entity;
using StocksGrpcService.Protos;

namespace StocksRepository.Mappers
{
    public class GrpcResponseMapper
    {
        public StocksListResponseEntity ToListEntity(StocksListResponsegrpcDTO grpcResponse)
        {
            var entity = new StocksListResponseEntity
            {
                TotalCount = grpcResponse.TotalCount,
            };

            foreach (var stock in grpcResponse.Stocks)
            {
                entity.Stocks.Add(ToEntity(stock));
            }

            return entity;
        }
        public List<StocksResponseEntity> ToEntityList(StocksListResponsegrpcDTO grpcResponse)
        {
            var entities = new List<StocksResponseEntity>();

            foreach (var stock in grpcResponse.Stocks)
            {
                entities.Add(ToEntity(stock));
            }

            return entities;
        }
        private StocksResponseEntity ToEntity(StocksResponsegrpcDTO grpcStock)
        {
            var entity = new StocksResponseEntity
            {
                ProfileId = grpcStock.ProfileId,
                MakeId = grpcStock.MakeId,
                MakeName = grpcStock.MakeName ?? string.Empty,
                CityId = grpcStock.CityId,
                CityName = grpcStock.CityName ?? string.Empty,
                VersionName = grpcStock.VersionName,
                KmNumeric = grpcStock.KmNumeric,
                Fuel = grpcStock.Fuel ?? string.Empty,
                MakeYear = grpcStock.MakeYear,
                ModelName = grpcStock.ModelName,
                PriceNumeric = grpcStock.PriceNumeric,
                EmiPrice = grpcStock.EmiPrice
            };

            if (grpcStock.StockImages != null && grpcStock.StockImages.Count > 0)
            {
                entity.StockImages = grpcStock.StockImages.ToList();
            }

            return entity;
        }
    }
}