using StocksController.Controllers;
using StocksCommon.DTOs;
using StocksService.Interfaces;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Moq;
using Xunit;

namespace StocksWebApi.Tests.Controllers;

public class StockControllerTests
{
    // Setup Mocks at the class level
    private readonly Mock<IStockService> _mockStockService = new();
    private readonly Mock<ILogger<StockController>> _mockLogger = new();
    private readonly StockController _controller;

    public StockControllerTests()
    {
        // Initialize the controller with mocked dependencies
        _controller = new StockController(_mockLogger.Object, _mockStockService.Object);
    }

    [Fact]
    public async Task GetStocks_WhenDataExists_ReturnsOkWithFullResponse()
    {
        // 1. Arrange: Setup the "Success" scenario
        var request = new StocksRequestDTO(); // Add filters if needed
        var expectedResponse = CreateFullStocksListResponseDTO();

        _mockStockService.Setup(service => service.GetFilteredStocks(It.IsAny<StocksRequestDTO>()))
            .ReturnsAsync(expectedResponse);

        // 2. Act: Call the controller method
        var result = await _controller.GetStocks(request);

        // 3. Assert: Verify the result using FluentAssertions
        result.Should().BeOfType<OkObjectResult>()
            .Which.Value.Should().BeOfType<StocksListResponseDTO>()
            .Which.Should().BeEquivalentTo(expectedResponse, options => 
                options.ComparingByMembers<StocksListResponseDTO>());
        
        _mockLogger.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Successfully retrieved")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()),
            Times.Once);
    }

    [Fact]
    public async Task GetStocks_WhenNoStocksFound_ReturnsOkWithEmptyListAndWarning()
    {
        // 1. Arrange: Setup the "No Data" scenario
        var request = new StocksRequestDTO();
        var emptyResponse = new StocksListResponseDTO 
        { 
            Stocks = new List<StocksResponseDTO>(), 
            TotalCount = 0 ,
            NextPageUrl = null
        };

        _mockStockService.Setup(service => service.GetFilteredStocks(request))
            .ReturnsAsync(emptyResponse);

        // 2. Act
        var result = await _controller.GetStocks(request);

        // 3. Assert
        var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        
        // Check the anonymous object structure your controller returns
        okResult.Value.Should().NotBeNull();
        
        // Verify Logger recorded the warning for no results
        _mockLogger.Verify(
            x => x.Log(
                LogLevel.Warning,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("No vehicle stocks found")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()),
            Times.Once);
    }

    // Helper Method to generate complex DTO data
    private StocksListResponseDTO CreateFullStocksListResponseDTO()
    {
        return new StocksListResponseDTO
        {
            TotalCount = 1,
            NextPageUrl = "api/v1/stocks?page=2",
            Stocks = new List<StocksResponseDTO>
            {
                new StocksResponseDTO
                {
                    // Core Data
                    ProfileId = "1",
                    MakeId = 5,
                    MakeName = "Maruti Suzuki",
                    CityId = 101,
                    CityName = "Navi Mumbai",
                    VersionName = "Alpha",
                    KmNumeric = 5000,
                    Fuel = "Petrol",
                    MakeYear = 2024,
                    ModelName = "Grand Vitara",
                    PriceNumeric = 1800000,
                    EmiPrice = 32000,
                    StockImages = new List<string> { "front.jpg", "interior.jpg" },

                    // Extra Parameters (Calculated/Constructed)
                    Price = "₹ 18.00 Lakh",
                    EmiText = "EMI starts at ₹ 32,000/mo",
                    Km = "5,000 km",
                    CarName = "2024 Maruti Suzuki Grand Vitara",
                    IsValueForMoney = true
                }
            }
        };
    }
}