using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StocksCommon.DTOs;
using StocksService.Interfaces;
using StocksController.Validation;

namespace StocksController.Controllers
{
    // controller for the stocks endpoint, which will return a list of stocks based on the filters provided in the query parameters
    [ApiController]
    [Route("api/v1/stocks")]
    public class StockController : ControllerBase
    {
        private readonly ILogger<StockController> _logger;
        private readonly IStockService _stockService;

        public StockController(ILogger<StockController> logger, IStockService stockService)
        {
            _logger = logger;
            _stockService = stockService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [StrictQueryFilterAttribute("fuel", "budget", "car", "city", "sortby", "page")]
        public async Task<IActionResult> GetStocks([FromQuery] StocksRequestDTO request)
        {
            _logger.LogInformation("Stocks Controller: Processing GetStocks request. Filters applied: {@StockFilters}", request);

            var response = _stockService.GetFilteredStocks(request);
            var result = await response;

            if (result.Stocks == null || !result.Stocks.Any())
            {
                _logger.LogWarning("Stocks Controller: No vehicle stocks found matching the criteria: {@StockFilters}", request);
                return Ok(new { stocks = new List<object>(), NextPageUrl = (string)null, totalCount = 0 });
            }

            _logger.LogInformation("Stocks Controller: Successfully retrieved {Count} stocks.", result.Stocks.Count);

            return Ok(result);
        }

    }
}