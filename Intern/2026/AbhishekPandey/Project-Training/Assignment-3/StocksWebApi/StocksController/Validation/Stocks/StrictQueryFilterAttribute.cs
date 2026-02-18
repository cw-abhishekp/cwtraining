using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace StocksController.Validation;

public class StrictQueryFilterAttribute : ActionFilterAttribute
{
    private readonly HashSet<string> _allowedKeys;

    // This MUST match the class name exactly
    public StrictQueryFilterAttribute(params string[] allowedKeys)
    {
        _allowedKeys = new HashSet<string>(allowedKeys, StringComparer.OrdinalIgnoreCase);
    }

    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var queryKeys = context.HttpContext.Request.Query.Keys;
        
        foreach (var key in queryKeys)
        {
            if (!_allowedKeys.Contains(key))
            {
                context.Result = new BadRequestObjectResult(new
                {
                    error = true,
                    message = $"Malicious or unknown parameter detected: '{key}'.",
                    details = "This API does not allow undocumented query parameters."
                });
                return;
            }
        }
    }
}