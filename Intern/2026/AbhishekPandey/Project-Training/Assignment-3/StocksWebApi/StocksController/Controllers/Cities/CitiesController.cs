using Microsoft.AspNetCore.Mvc;
using StocksService.Interfaces;

namespace StocksController.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class CitiesController : ControllerBase
{
    private readonly ILogger<CitiesController> _logger;
    private readonly ICitiesService _citiesService;

    public CitiesController(ILogger<CitiesController> logger, ICitiesService citiesService)
    {
        _logger = logger;
        _citiesService = citiesService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetAllCities()
    {
        _logger.LogInformation("Cities Controller: Processing GET request to retrieve all cities.");

        var result = await _citiesService.GetAllCities();

        if (result == null || !result.Any())
        {
            _logger.LogWarning("Cities Controller: No cities were found in the database.");
            return Ok(new List<object>());
        }

        _logger.LogInformation("Cities Controller: Successfully retrieved {Count} cities.", result.Count());
        return Ok(result);
    }
}