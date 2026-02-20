using System.ComponentModel.DataAnnotations;
using System.Globalization;
using StocksCommon.Enums;

namespace StocksCommon.Validation
{
    public static class StockRequestValidator
    {
        public static IEnumerable<ValidationResult> ValidateBudget(string? budget, string fieldName)
        {
            if (string.IsNullOrWhiteSpace(budget)) yield break;

            var parts = budget.Split('-');
            if (parts.Length != 2)
            {
                yield return new ValidationResult("Budget must follow the format 'Min-Max' or 'Min-'.", new[] { fieldName });
                yield break;
            }

            string minStr = parts[0].Trim();
            string maxStr = parts[1].Trim();

            if (string.IsNullOrEmpty(minStr))
            {
                yield return new ValidationResult($"Budget cannot start with a hyphen. Use '0-{maxStr}' instead of '-{maxStr}'.", new[] { fieldName }
  );
                yield break;
            }

            if (!double.TryParse(minStr, out double min) || min < 0)
                yield return new ValidationResult("Min budget must be a valid positive number.", new[] { fieldName });

            if (!string.IsNullOrEmpty(maxStr))
            {
                if (!double.TryParse(maxStr, out double max) || max < 0)
                    yield return new ValidationResult("Max budget must be a valid positive number.", new[] { fieldName });
                else if (min > max)
                    yield return new ValidationResult($"Invalid range: {min} cannot be greater than {max}.", new[] { fieldName });
            }
        }

        public static IEnumerable<ValidationResult> ValidateIds<TEnum>(string? input, string fieldName, bool isEnum = false) where TEnum : struct, Enum
        {
            if (string.IsNullOrWhiteSpace(input)) yield break;

            var ids = input.Split(new[] { ',', '+', '-', ' ' }, StringSplitOptions.RemoveEmptyEntries);
            foreach (var id in ids)
            {
                if (!int.TryParse(id, NumberStyles.Integer, null, out int val) || val <= 0)
                {
                    yield return new ValidationResult($"Invalid {fieldName} ID: '{id}'. Only positive integers are allowed.", new[] { fieldName });
                    continue;
                }

                if (isEnum && !Enum.IsDefined(typeof(TEnum), val))
                {
                    yield return new ValidationResult($"Invalid {fieldName} ID: '{id}'. Value is not defined in the system.", new[] { fieldName });
                }
            }
        }


         public static IEnumerable<ValidationResult> ValidateNumericIds(string? input, string fieldName)
        {
            if (string.IsNullOrWhiteSpace(input)) yield break;

            var ids = input.Split(new[] { ',', '+', '-', ' ' }, StringSplitOptions.RemoveEmptyEntries);
            foreach (var id in ids)
            {
                if (!int.TryParse(id, NumberStyles.Integer, null, out int val) || val <= 0)
                {
                    yield return new ValidationResult($"Invalid {fieldName} ID: '{id}'. Only positive integers are allowed.", new[] { fieldName });
                    continue;
                }
            }
        }

        public static IEnumerable<ValidationResult> ValidateSortBy(string? sortBy, string fieldName)
        {
            if (string.IsNullOrWhiteSpace(sortBy)) yield break;

            if (!Enum.TryParse<SortByType>(sortBy, true, out var result) || !Enum.IsDefined(typeof(SortByType), result))
            {
                yield return new ValidationResult($"'{sortBy}' is an invalid sorting option.", new[] { fieldName });
            }
        }
    }
}