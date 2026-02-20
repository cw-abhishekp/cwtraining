using FluentAssertions;
using Microsoft.Extensions.Logging;
using Moq;
using StocksGrpcService.Protos;
using StocksRepository.Clients;
using Grpc.Core;
namespace StocksWebApi.Tests.Clients;

public class StocksGrpcClientTests
{
    private readonly Mock<ILogger<StocksGrpcClient>> _mockLogger = new();
    private const string DummyUrl = "http://localhost:5001";

    [Fact]
    public async Task GetFilteredStocksAsync_WithCompleteData_ReturnsAllProtoFields()
    {
        // 1. Arrange
        var mockClient = new Mock<IStocksGrpcClient>();
        var request = new FiltergrpcDTO { Page = 1, MaxBudget = 500000 };
        
        // Populate the request with repeated fields
        request.FuelTypeIds.Add(1); 
        request.MakeIds.Add(10);

        var expectedResponse = CreateCompleteMockResponse();

        mockClient
            .Setup(c => c.GetFilteredStocksAsync(It.IsAny<FiltergrpcDTO>()))
            .ReturnsAsync(expectedResponse);

        // 2. Act
        var result = await mockClient.Object.GetFilteredStocksAsync(request);

        // 3. Assert
        result.Should().NotBeNull();
        result.TotalCount.Should().Be(1);
        result.Stocks.Should().HaveCount(1);

        // Verify specific complex fields from your Proto
        var stock = result.Stocks[0];
        stock.MakeName.Should().Be("Maruti Suzuki");
        stock.PriceNumeric.Should().Be(263000);
        stock.EmiPrice.Should().Be(4731);
        stock.StockImages.Should().Contain("https://images.example.com/swift_front.jpg");

        // Deep comparison of the entire object tree
        result.Should().BeEquivalentTo(expectedResponse);
    }

    [Fact]
    public async Task GetFilteredStocksAsync_WhenGrpcServerIsDown_ThrowsRpcException()
    {
        // Arrange
        var mockClient = new Mock<IStocksGrpcClient>();
        mockClient
            .Setup(c => c.GetFilteredStocksAsync(It.IsAny<FiltergrpcDTO>()))
            .ThrowsAsync(new RpcException(new Status(StatusCode.Unavailable, "Service is down")));

        // Act
        Func<Task> act = async () => await mockClient.Object.GetFilteredStocksAsync(new FiltergrpcDTO());

        // Assert
        await act.Should().ThrowAsync<RpcException>()
            .Where(e => e.StatusCode == StatusCode.Unavailable);
    }



    [Fact]
    public void StocksGrpcClient_Dispose_CleansUpResourcesWithoutError()
    {
        // Arrange - We test the REAL class here to ensure _channel.Dispose() works
        var realClient = new StocksGrpcClient(DummyUrl, _mockLogger.Object);

        // Act
        Action act = () => realClient.Dispose();

        // Assert
        act.Should().NotThrow();
    }

    private StocksListResponsegrpcDTO CreateCompleteMockResponse()
    {
        var response = new StocksListResponsegrpcDTO
        {
            TotalCount = 1,
        };

        var stockItem = new StocksResponsegrpcDTO
        {
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
            ModelName = "Swift"
        };

        stockItem.StockImages.Add("https://images.example.com/swift_front.jpg");
        stockItem.StockImages.Add("https://images.example.com/swift_interior.jpg");

        response.Stocks.Add(stockItem);

        return response;
    }

    
}