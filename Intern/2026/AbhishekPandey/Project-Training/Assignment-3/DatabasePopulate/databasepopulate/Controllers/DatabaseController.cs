using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using Dapper;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace StocksPopulator.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DatabaseController : ControllerBase
{
    private readonly string _connectionString;
    private readonly IHttpClientFactory _httpClientFactory;

    public DatabaseController(IConfiguration config, IHttpClientFactory httpClientFactory)
    {
        _connectionString = config.GetConnectionString("MySqlDBString");
        _httpClientFactory = httpClientFactory;
    }

    // Helper to safely handle both "123" (string) and 123 (number) from JSON
    private int SafeInt(JsonElement el)
    {
        if (el.ValueKind == JsonValueKind.Number) return el.GetInt32();
        if (el.ValueKind == JsonValueKind.String && int.TryParse(el.GetString(), out var val)) return val;
        return 0;
    }

   [HttpPost("populate-all")]
public async Task<IActionResult> PopulateDatabase()
{
    var client = _httpClientFactory.CreateClient();
    // Start with the base URL
    string? nextUrl = "https://stg.carwale.com/api/stocks";
    int totalPagesProcessed = 0;

    try
    {
        // 1. Initial fetches for lookup data (Cities and Makes)
        var citiesRaw = await client.GetFromJsonAsync<List<JsonElement>>("https://stg.carwale.com/api/cities");
        var makesRaw = await client.GetFromJsonAsync<List<JsonElement>>("https://stg.carwale.com/api/v2/makes/?type=new");

        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        // Perform City/Make population once at the start
        await PopulateLookups(connection, citiesRaw, makesRaw);

        // 2. Loop through pagination for Stocks
        while (!string.IsNullOrEmpty(nextUrl))
        {
            // Ensure URL is absolute
            if (!nextUrl.StartsWith("http")) nextUrl = "https://stg.carwale.com" + nextUrl;

            var stocksRaw = await client.GetFromJsonAsync<JsonElement>(nextUrl);
            
            // Start a transaction for this specific page
            using var transaction = await connection.BeginTransactionAsync();
            try
            {
                if (stocksRaw.TryGetProperty("stocks", out var stocksArray))
                {
                    await ProcessStocksPage(connection, transaction, stocksArray.EnumerateArray());
                }

                await transaction.CommitAsync();
                totalPagesProcessed++;

                // 3. Follow the next page link
                nextUrl = stocksRaw.TryGetProperty("nextPageUrl", out var next) ? next.GetString() : null;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new Exception($"Error on page {totalPagesProcessed + 1}: {ex.Message}");
            }
        }

        return Ok(new { status = "Success", pagesProcessed = totalPagesProcessed });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { status = "Error", detail = ex.Message });
    }
}

private async Task ProcessStocksPage(MySqlConnection conn, MySqlTransaction trans, JsonElement.ArrayEnumerator stocks)
{
    foreach (JsonElement car in stocks)
    {
        // ... (Your existing Regex/Fuel mapping logic remains exactly the same) ...
        string emiText = car.TryGetProperty("emiText", out var et) ? et.GetString() ?? "" : "";
        uint? cleanEmi = null;
        var match = Regex.Match(emiText, @"[\d,]+");
        if (match.Success) cleanEmi = uint.Parse(match.Value.Replace(",", ""));

        string fuelStr = car.GetProperty("fuel").GetString() ?? "Petrol";
        byte fuelType = fuelStr switch { "Petrol" => 1, "Diesel" => 2, "CNG" => 3, _ => 1 };

        const string stockSql = @"
            INSERT INTO stock (api_external_id, make_id, city_id, model_name, version_name, 
                               km_numeric, fuel, make_year, price_numeric, emi_price)
            VALUES (@apiId, @mId, @cId, @model, @version, @km, @fuel, @year, @price, @emi)
            ON DUPLICATE KEY UPDATE price_numeric=VALUES(price_numeric), emi_price=VALUES(emi_price), 
                                    profile_id=LAST_INSERT_ID(profile_id);
            SELECT LAST_INSERT_ID();";

        var internalId = await conn.ExecuteScalarAsync<long>(stockSql, new {
            apiId = car.GetProperty("profileId").GetString(),
            mId = SafeInt(car.GetProperty("makeId")),
            cId = SafeInt(car.GetProperty("cityId")),
            model = car.GetProperty("rootName").GetString(),
            version = car.GetProperty("versionName").GetString(),
            km = SafeInt(car.GetProperty("kmNumeric")),
            fuel = fuelType,
            year = SafeInt(car.GetProperty("makeYear")),
            price = SafeInt(car.GetProperty("priceNumeric")),
            emi = cleanEmi
        }, trans);

        // Images processing
        if (car.TryGetProperty("stockImages", out JsonElement images))
        {
            await conn.ExecuteAsync("DELETE FROM stock_images WHERE profile_id = @pid", new { pid = internalId }, trans);
            foreach (var img in images.EnumerateArray())
            {
                await conn.ExecuteAsync("INSERT INTO stock_images (profile_id, image_url) VALUES (@pid, @url)", 
                                        new { pid = internalId, url = img.GetString() }, trans);
            }
        }
    }
}
private async Task PopulateLookups(MySqlConnection conn, List<JsonElement>? cities, List<JsonElement>? makes)
{
    if (cities != null)
    {
        const string citySql = @"INSERT INTO city (city_id, city_name, is_popular) 
                                 VALUES (@id, @name, @pop) 
                                 ON DUPLICATE KEY UPDATE city_name=VALUES(city_name);";
        var cityParams = cities.Select(c => new {
            id = SafeInt(c.GetProperty("CityId")),
            name = c.GetProperty("CityName").GetString() ?? "Unknown",
            pop = c.GetProperty("IsPopular").GetBoolean()
        });
        await conn.ExecuteAsync(citySql, cityParams);
    }

    if (makes != null)
    {
        const string makeSql = @"INSERT INTO make (make_id, make_name) 
                                 VALUES (@id, @name) 
                                 ON DUPLICATE KEY UPDATE make_name=VALUES(make_name);";
        var makeParams = makes.Select(m => new {
            id = SafeInt(m.GetProperty("makeId")),
            name = m.GetProperty("makeName").GetString() ?? "Unknown"
        });
        await conn.ExecuteAsync(makeSql, makeParams);
    }
}
}