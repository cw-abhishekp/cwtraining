using Grpc.Core;
using Grpc.Core.Interceptors;
using MySqlConnector;

public class ErrorHandlingInterceptor : Interceptor
{
    private readonly ILogger<ErrorHandlingInterceptor> _logger;

    public ErrorHandlingInterceptor(ILogger<ErrorHandlingInterceptor> logger)
    {
        _logger = logger;
    }

    public override async Task<TResponse> UnaryServerHandler<TRequest, TResponse>(
        TRequest request, ServerCallContext context, UnaryServerMethod<TRequest, TResponse> continuation)
    {
        try
        {
            return await continuation(request, context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Exception in gRPC Method: {Method}", context.Method);

            var status = ex switch
            {
                MySqlException => new Status(StatusCode.Unavailable, "Database is temporarily unavailable."),
                ArgumentException or InvalidOperationException => new Status(StatusCode.InvalidArgument, ex.Message),
                TimeoutException => new Status(StatusCode.DeadlineExceeded, "The database operation timed out."),
                _ => new Status(StatusCode.Internal, "A critical internal error occurred.")
            };

            throw new RpcException(status);
        }
    }
}