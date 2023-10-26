using Altinn.Authentication.UI.Core.AppConfiguration;
using Altinn.Authentication.UI.Integration.Configuration;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.Extensions.Options;

namespace Altinn.Authentication.UI.Filters;

public class ValidateAntiforgeryTokenIfAuthCookieAuthorizationFilter : IAsyncAuthorizationFilter, IAntiforgeryPolicy
{
    private readonly IAntiforgery _antiforgery;
    private readonly PlatformSettings _platformSettings;
    private readonly GeneralSettings _generalSettings;
    //TODO
    
    public ValidateAntiforgeryTokenIfAuthCookieAuthorizationFilter(
        IAntiforgery antiforgery,
        IOptionsMonitor<PlatformSettings> platformSettings)
    {
        _antiforgery = antiforgery;
        _platformSettings = platformSettings.CurrentValue;
    }

    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        if (!context.IsEffectivePolicy<IAntiforgeryPolicy>(this)) { return; }

        if (ShouldValidate(context))
        {
            try
            {
                await _antiforgery.ValidateRequestAsync(context.HttpContext);
            }
            catch
            {
                context.Result = new AntiforgeryValidationFailedResult();
            }
        }
    }

    protected virtual bool ShouldValidate(AuthorizationFilterContext context)
    {
        if (context is null)
        {
            throw new ArgumentOutOfRangeException(nameof(context));
        }

        string method = context.HttpContext.Request.Method;
        if (
            string.Equals("GET", method, StringComparison.OrdinalIgnoreCase) ||
            string.Equals("HEAD", method, StringComparison.OrdinalIgnoreCase) ||
            string.Equals("TRACE", method, StringComparison.OrdinalIgnoreCase) ||
            string.Equals("OPTIONS", method, StringComparison.OrdinalIgnoreCase)
           )
        {
            return false;
        }

        string? cookieName = _platformSettings.JwtCookieName;
        if (cookieName is null) return true;

        string? authcookie = context.HttpContext.Request.Cookies[cookieName];//"AltinnStudioRuntime"
        if (authcookie is null)
        {
            return false;
        }

        return true;

    }
}
