using StocksCommon.Mappers;
using StocksRepository.Clients;
using StocksRepository.Interfaces;
using StocksRepository.Mappers;
using StocksRepository.Repository;
using StocksService.Business.ResponseStocks;
using StocksService.Interfaces;
using StocksService.Services;
using Serilog;
using Serilog.Events;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, services, configuration) => configuration
    .ReadFrom.Configuration(context.Configuration));


// Log.Logger = new LoggerConfiguration()
//     .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
//     .Enrich.FromLogContext()
//     .WriteTo.Console()
//     .WriteTo.File("Logs/api-audit-.txt", 
//         rollingInterval: RollingInterval.Day,
//         outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj}{NewLine}{Exception}")
//     .CreateLogger();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// for registering the mapper
builder.Services.AddSingleton<StocksMapper>();
builder.Services.AddSingleton<FilterMapper>();
builder.Services.AddSingleton<FiltergrpcMapper>();
builder.Services.AddSingleton<GrpcResponseMapper>();
builder.Services.AddSingleton<StocksResponseDTOMapper>();
builder.Services.AddSingleton<GrpcMakeResponseMapper>();
builder.Services.AddSingleton<GrpcCitiesResponseMapper>();

builder.Services.AddSingleton<CitiesMapper>();
builder.Services.AddSingleton<MakeMapper>();

// for registering the stock service and repo
builder.Services.AddScoped<IStockService, StockService>();
builder.Services.AddScoped<IStockRepository, StockRepository>();
builder.Services.AddScoped<IMakeRepository, MakeRepository>();
builder.Services.AddScoped<IMakeService, MakeService>();
builder.Services.AddScoped<ICitiesRepository, CitiesRepository>();
builder.Services.AddScoped<ICitiesService, CitiesService>();

// logic
builder.Services.AddScoped<IResponseStocksLogic, ResponseStocksLogic>();
builder.Services.AddScoped<IResponseNextPage, ResponseNextPage>();

// Register the Grpc Clients
var grpcUrl = builder.Configuration["GrpcSettings:ServerUrl"]
              ?? throw new InvalidOperationException("GrpcSettings:ServerUrl not configured");

builder.Services.AddSingleton<IStocksGrpcClient>(sp =>
    new StocksGrpcClient(grpcUrl, sp.GetRequiredService<ILogger<StocksGrpcClient>>()));

builder.Services.AddSingleton<IMakeGrpcClient>(sp =>
    new MakeGrpcClient(grpcUrl, sp.GetRequiredService<ILogger<MakeGrpcClient>>()));

builder.Services.AddSingleton<ICitiesGrpcClient>(sp =>
    new CitiesGrpcClient(grpcUrl, sp.GetRequiredService<ILogger<CitiesGrpcClient>>()));



builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = actionContext =>
        {
            var modelState = actionContext.ModelState;
            var response = new
            {
                Message = "The request is invalid.",
                ModelState = modelState.ToDictionary(
                    kvp => kvp.Key.ToLower(),
                    kvp => kvp.Value?.Errors.Select(e => e.ErrorMessage).ToArray()
                )
            };
            return new BadRequestObjectResult(response);
        };
    });

var app = builder.Build();

app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseCors("MyPolicyName"); 

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

try
{
    Log.Information("Starting Web API...");
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "API terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}