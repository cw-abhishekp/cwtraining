using System.ComponentModel.DataAnnotations;
using StocksCommon.Enums;
using StocksCommon.Validation;


namespace StocksCommon.DTOs
{
    public class StocksRequestDTO : IValidatableObject
    {
        public string? Fuel { get; set; }
        public string? Budget { get; set; }
        public string? Car { get; set; }
        public string? City { get; set; }
        public string? SortBy { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Page must be greater than 0")]
        public int Page { get; set; } = 1;

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        foreach (var error in StockRequestValidator.ValidateBudget(Budget, nameof(Budget))) yield return error;
        foreach (var error in StockRequestValidator.ValidateSortBy(SortBy, nameof(SortBy))) yield return error;
        foreach (var error in StockRequestValidator.ValidateIds<FuelType>(Fuel, nameof(Fuel), isEnum: true)) yield return error;
        foreach (var error in StockRequestValidator.ValidateNumericIds(Car, nameof(Car))) yield return error;
        foreach (var error in StockRequestValidator.ValidateNumericIds(City, nameof(City))) yield return error;
    }
    }
}