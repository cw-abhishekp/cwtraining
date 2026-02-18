using Grpc.Core;
using System.Net;

public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        if (context.Response.HasStarted)
        {
            _logger.LogWarning("The response has already started, the middleware cannot write the error response.");
            return;
        }
        context.Response.Headers.Append("Cache-Control", "no-cache, no-store, must-revalidate");
        context.Response.Headers.Append("Pragma", "no-cache");
        context.Response.Headers.Append("Expires", "0");
        // 1. Determine Status Code based on Exception Type
        int statusCode = exception switch
        {
            RpcException rpcEx => rpcEx.StatusCode switch
            {
                StatusCode.InvalidArgument => (int)HttpStatusCode.BadRequest,
                StatusCode.Unauthenticated => (int)HttpStatusCode.Unauthorized,
                StatusCode.PermissionDenied => (int)HttpStatusCode.Forbidden,
                StatusCode.NotFound => (int)HttpStatusCode.NotFound,
                StatusCode.AlreadyExists => (int)HttpStatusCode.Conflict,
                StatusCode.DeadlineExceeded => (int)HttpStatusCode.GatewayTimeout,
                StatusCode.Unavailable => (int)HttpStatusCode.ServiceUnavailable,
                StatusCode.Unimplemented => (int)HttpStatusCode.NotImplemented,
                _ => (int)HttpStatusCode.InternalServerError
            },
            UnauthorizedAccessException => (int)HttpStatusCode.Unauthorized,
            ArgumentException or InvalidOperationException => (int)HttpStatusCode.BadRequest,
            KeyNotFoundException => (int)HttpStatusCode.NotFound,
            _ => (int)HttpStatusCode.InternalServerError
        };

        // 2. Extract the best message for the user
        string message = exception switch
        {
            RpcException rpcEx => rpcEx.Status.Detail ?? "A remote service error occurred.",
            _ => exception.Message ?? "An unexpected error occurred."
        };

        // 3. Log based on severity
        if (statusCode >= 500)
        {
            _logger.LogError(exception, "CRITICAL ERROR: {Message} | Path: {Path}", message, context.Request.Path);
        }
        else
        {
            _logger.LogWarning("Request Issue: {Message} | StatusCode: {Status}", message, statusCode);
        }


        // 4. Final Response
        context.Response.StatusCode = statusCode;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(new
        {
            error = true,
            statusCode = statusCode,
            message = message,
            details = exception is RpcException r ? r.StatusCode.ToString() : exception.GetType().Name
        });
    }
}