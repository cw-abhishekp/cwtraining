using StocksGrpcService.Common.Enums;
using System.ComponentModel.DataAnnotations;

namespace StocksGrpcService.Entity
{
    public class FilterEntity
    {
   public List<int>? FuelTypeIds { get; set; }

            [Range(0, double.MaxValue, ErrorMessage = "MinBudget must be between 0 and 10000")]
            public double? MinBudget { get; set; }

            [Range(0, double.MaxValue, ErrorMessage = "MaxBudget must be between 0 and 10000")]
            public double? MaxBudget { get; set; }

            public List<int>? MakeIds { get; set; }
            public List<int>? CityIds { get; set; }

            [Required(ErrorMessage = "SortByType is required")]
            [EnumDataType(typeof(SortByType), ErrorMessage = "Invalid SortByType value")]
            public SortByType SortByType { get; set; } = SortByType.BestMatch;

            [Range(1, int.MaxValue, ErrorMessage = "Page must be greater than 0")]
            [Required(ErrorMessage = "Page is required")]
            public int Page { get; set; } = 1;

            [Range(1, 100, ErrorMessage = "PageSize must be between 1 and 100")]
            [Required(ErrorMessage = "PageSize is required")]
            public int PageSize { get; set; } = 20;
    }
}
