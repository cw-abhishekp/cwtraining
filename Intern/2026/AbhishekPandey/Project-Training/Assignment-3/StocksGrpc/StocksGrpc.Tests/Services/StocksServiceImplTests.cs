using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using Grpc.Core;
using Moq;
using StocksGrpcService.Entity;
using StocksGrpcService.Repository;
using Microsoft.Extensions.Logging;
using StocksGrpcService.Services;
using StocksGrpcService.Mappers;
using StocksGrpcService.Protos;

namespace StocksGrpc.Tests.Services;

public class StocksServiceImplTests
{
    private readonly Mock<IStockRepository> _mockRepo = new();
    private readonly Mock<ILogger<StocksServiceImpl>> _mockLogger = new();
    private readonly ProtoMapper _protoMapper = new();
    private readonly StocksServiceImpl _service;

    public StocksServiceImplTests()
    {
        _service = new StocksServiceImpl(_mockRepo.Object, _protoMapper, _mockLogger.Object);
    }

    [Fact]
    public async Task GetFilteredStocks_WithAllFields_ReturnsFullProtoResponse()
    {
        // 1. Arrange: Setup request with all filter fields
        var request = new FiltergrpcDTO
        {
            MinBudget = 1,
            MaxBudget = 8,
            Page = 1,
            SortByType = 1
        };
        request.FuelTypeIds.Add(1);
        request.MakeIds.Add(10);
        request.CityIds.Add(176);

        // Setup Repository to return a StockEntity with every single field populated
        var mockEntities = new List<StockEntity>
        {
            new StockEntity {
                ProfileId = 1,
                MakeId = 10,
                MakeName = "Maruti Suzuki",
                CityId = 176,
                CityName = "Chennai",
                VersionName = "VXi [2014-2019]",
                KmNumeric = 12563,
                Fuel = "Petrol",
                MakeYear = 2016,
                PriceNumeric = 263000,
                EmiPrice = 4731,
                ModelName = "Swift",
                StockImages = new List<string> { "img1.jpg", "img2.jpg" }
            }
        };
        int mockTotalCount = 100;

        _mockRepo.Setup(r => r.GetFilteredStocks(It.IsAny<FilterEntity>()))
                 .ReturnsAsync((mockEntities, mockTotalCount));

        var context = CreateServerCallContext();

        // 2. Act
        var response = await _service.GetFilteredStocks(request, context);

        // 3. Assert: Verify every field in the gRPC response matches the Proto definition
        response.Should().NotBeNull();
        response.TotalCount.Should().Be(100);
        response.Stocks.Should().HaveCount(1);

        var actual = response.Stocks[0];
        actual.ProfileId.Should().Be(1);
        actual.MakeId.Should().Be(10);
        actual.MakeName.Should().Be("Maruti Suzuki");
        actual.CityId.Should().Be(176);
        actual.CityName.Should().Be("Chennai");
        actual.VersionName.Should().Be("VXi [2014-2019]");
        actual.KmNumeric.Should().Be(12563);
        actual.Fuel.Should().Be("Petrol");
        actual.MakeYear.Should().Be(2016);
        actual.PriceNumeric.Should().Be(263000);
        actual.EmiPrice.Should().Be(4731);
        actual.ModelName.Should().Be("Swift");
        actual.StockImages.Should().ContainInOrder("img1.jpg", "img2.jpg");

        // Verify Repository Interaction
        _mockRepo.Verify(r => r.GetFilteredStocks(It.IsAny<FilterEntity>()), Times.Once);
    }

    [Fact]
    public async Task GetFilteredStocks_WhenRepositoryReturnsEmpty_ReturnsEmptyResponse()
    {
        // Arrange
        _mockRepo.Setup(r => r.GetFilteredStocks(It.IsAny<FilterEntity>()))
                 .ReturnsAsync((new List<StockEntity>(), 0));

        // Act
        var response = await _service.GetFilteredStocks(new FiltergrpcDTO(), CreateServerCallContext());

        // Assert
        response.Stocks.Should().BeEmpty();
        response.TotalCount.Should().Be(0);
    }

    private static ServerCallContext CreateServerCallContext()
    {
        return new Mock<ServerCallContext>().Object;
    }
}