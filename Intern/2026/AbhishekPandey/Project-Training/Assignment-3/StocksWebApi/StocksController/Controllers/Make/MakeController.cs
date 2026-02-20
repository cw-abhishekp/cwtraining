using Microsoft.AspNetCore.Mvc;
using StocksService.Interfaces;

namespace StocksController.Controllers;


// controller for the make table,which will be used to retrieve all car makes from the database
[ApiController]
[Route("api/v1/[controller]")]
public class MakeController : ControllerBase
{
    private readonly ILogger<MakeController> _logger;
    private readonly IMakeService _makeService;

    public MakeController(ILogger<MakeController> logger, IMakeService makeService)
    {
        _logger = logger;
        _makeService = makeService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetMake()
    {
        _logger.LogInformation("Make Controller: Processing GET request to retrieve all car makes.");

        var result = await _makeService.GetAllMake();

        if (result == null || !result.Any())
        {
            _logger.LogWarning("Make Controller: No car makes were found in the database.");
            return Ok(new List<object>());
        }

        _logger.LogInformation("Make Controller: Successfully retrieved {Count} car makes.", result.Count());
        return Ok(result);
    }
}