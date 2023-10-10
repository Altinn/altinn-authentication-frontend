using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.Extensions.Options;

namespace Altinn.Authentication.UI.Filters;

public class ValidateAntiforgeryTokenIfAuthCookieAuthorizationFilter : IAsyncAuthorizationFilter, IAntiforgeryPolicy
{
    private readonly IAntiforgery _antiforgery;
    
    public ValidateAntiforgeryTokenIfAuthCookieAuthorizationFilter(
        IAntiforgery antiforgery)
    {
        _antiforgery = antiforgery;
    }

    public Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        throw new NotImplementedException();
    }
}
