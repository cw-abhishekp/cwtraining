using Riok.Mapperly.Abstractions;
using StocksCommon.DTOs;
using StocksCommon.Entity;
using StocksCommon.Enums;

namespace StocksCommon.Mappers
{
    [Mapper]
    public partial class StocksMapper
    {
        public Filter MapToFilter(StocksRequestDTO dto)
        {
            var filter = new Filter
            {
                Page = dto.Page,
                // PageSize = dto.PageSize,
                FuelTypeIds = ParseIds(dto.Fuel),
                MakeIds = ParseIds(dto.Car),
                CityIds = ParseIds(dto.City),
                SortByType = ParseSortBy(dto.SortBy)
            };

            var (min, max) = ParseBudget(dto.Budget);
            filter.MinBudget = min;
            filter.MaxBudget = max;

            return filter;
        }

        private List<int>? ParseIds(string? idsString)
        {
            if (string.IsNullOrWhiteSpace(idsString))
                return null;

            var ids = idsString
                .Split(new[] { ' ', '+' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(part => int.TryParse(part, out int id) ? (int?)id : null)
                .Where(id => id.HasValue)
                .Select(id => id!.Value)
                .ToList();

            return ids.Any() ? ids : null;
        }

        private (double? min, double? max) ParseBudget(string? budget)
        {
            if (string.IsNullOrWhiteSpace(budget))
                return (null, null);

            var parts = budget.Split('-');

            if (parts.Length != 2)
                return (null, null);

            double? min = double.TryParse(parts[0], out double minVal) ? minVal : null;
            double? max = double.TryParse(parts[1], out double maxVal) ? maxVal : null;
            
            return (min, max);
        }

        private SortByType ParseSortBy(string? sortBy)
        {
            if (string.IsNullOrWhiteSpace(sortBy))
                return SortByType.BestMatch;

            var normalized = sortBy.ToLower().Replace(" ", "").Replace("-", "");

            return normalized switch
            {
                "priceasc" => SortByType.PriceAsc,
                "pricedesc" => SortByType.PriceDesc,
                "yearasc" => SortByType.YearAsc,
                "yeardesc" => SortByType.YearDesc,
                _ => SortByType.BestMatch
            };
        }
    }
}