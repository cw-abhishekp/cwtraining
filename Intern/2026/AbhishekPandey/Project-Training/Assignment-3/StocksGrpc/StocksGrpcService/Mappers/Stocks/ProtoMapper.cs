using Riok.Mapperly.Abstractions;
using StocksGrpcService.Protos;
using StocksGrpcService.Common.Enums;
using StocksGrpcService.Entity;

namespace StocksGrpcService.Mappers
{
    [Mapper]
    public partial class ProtoMapper
    {
        public FilterEntity ToFilterEntity(FiltergrpcDTO protoFilter)
        {
            var filterEntity = new FilterEntity
            {
                MinBudget = protoFilter.MinBudget,
                MaxBudget = protoFilter.MaxBudget,
                Page = protoFilter.Page,
                // PageSize = protoFilter.PageSize,
                SortByType = (SortByType)protoFilter.SortByType
            };

            if (protoFilter.FuelTypeIds != null && protoFilter.FuelTypeIds.Count > 0)
            {
                filterEntity.FuelTypeIds = protoFilter.FuelTypeIds.ToList();
            }

            if (protoFilter.MakeIds != null && protoFilter.MakeIds.Count > 0)
            {
                filterEntity.MakeIds = protoFilter.MakeIds.ToList();
            }

            if (protoFilter.CityIds != null && protoFilter.CityIds.Count > 0)
            {
                filterEntity.CityIds = protoFilter.CityIds.ToList();
            }
            return filterEntity;
        }

        public StocksResponsegrpcDTO ToProtoResponse(StockEntity stockEntity)
        {
            var response = new StocksResponsegrpcDTO
            {
                ProfileId = stockEntity.ProfileId,
                MakeId = stockEntity.MakeId,
                MakeName = stockEntity.MakeName,
                CityId = stockEntity.CityId,
                CityName = stockEntity.CityName,
                VersionName = stockEntity.VersionName ?? string.Empty,
                KmNumeric = stockEntity.KmNumeric,
                Fuel = stockEntity.Fuel,
                MakeYear = stockEntity.MakeYear,
                ModelName = stockEntity.ModelName ?? string.Empty,
                PriceNumeric = stockEntity.PriceNumeric,
                EmiPrice = stockEntity.EmiPrice
            };

            if (stockEntity.StockImages != null && stockEntity.StockImages.Any())
            {
                response.StockImages.AddRange(stockEntity.StockImages);
            }

            return response;
        }
        public StocksListResponsegrpcDTO ToProtoListResponse(
            List<StockEntity> stockEntities,
            int totalCount)
        {
            var response = new StocksListResponsegrpcDTO
            {
                TotalCount = totalCount,
            };

            foreach (var stock in stockEntities)
            {
                response.Stocks.Add(ToProtoResponse(stock));
            }

            return response;
        }
    }
}