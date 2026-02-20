using Riok.Mapperly.Abstractions;
using StocksCommon.DTOs;
using StocksGrpcService.Protos;

namespace StocksRepository.Mappers;

[Mapper]
public partial class FiltergrpcMapper
{
    public FiltergrpcDTO ToFilterRequest(FilterDTO dto)
    {
        var request = new FiltergrpcDTO
        {
            MinBudget = dto.MinBudget ?? 0,
            MaxBudget = dto.MaxBudget ?? double.MaxValue,
            SortByType = (int)dto.SortByType,
            Page = dto.Page,
            // PageSize = dto.PageSize
        };

        if (dto.FuelTypeIds != null && dto.FuelTypeIds.Any())
        {
            request.FuelTypeIds.AddRange(dto.FuelTypeIds);
        }

        if (dto.MakeIds != null && dto.MakeIds.Any())
        {
            request.MakeIds.AddRange(dto.MakeIds);
        }

        if (dto.CityIds != null && dto.CityIds.Any())
        {
            request.CityIds.AddRange(dto.CityIds);
        }

        return request;
    }
}