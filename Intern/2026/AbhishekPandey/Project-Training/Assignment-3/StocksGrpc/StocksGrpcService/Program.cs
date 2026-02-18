using StocksGrpcService.Services;
using StocksGrpcService.Mappers;
using StocksGrpcService.Repository;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
   .MinimumLevel.Information()
   .WriteTo.Console()
   .WriteTo.File("Logs/grpc-service-.txt", rollingInterval: RollingInterval.Day)
   .CreateLogger();

builder.Host.UseSerilog();

// Add services to the container.
builder.Services.AddGrpc();
builder.Services.AddSingleton<ProtoMapper>();
builder.Services.AddSingleton<CitiesMapper>();
builder.Services.AddSingleton<MakeMapper>();


builder.Services.AddScoped<IStockRepository, StockRepository>();
builder.Services.AddScoped<IMakeRepository, MakeRepository>();
builder.Services.AddScoped<ICitiesRepository, CitiesRepository>();

builder.Services.AddGrpc(options =>
{
    options.Interceptors.Add<ErrorHandlingInterceptor>();
});

var app = builder.Build();
app.MapGrpcService<StocksServiceImpl>();
app.MapGrpcService<MakeServiceImpl>();
app.MapGrpcService<CitiesServiceImpl>();

// Configure the HTTP request pipeline.
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();
