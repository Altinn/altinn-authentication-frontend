using Microsoft.AspNetCore.Mvc.Filters;

namespace Altinn.Authentication.UI.Filters;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
public class AutoValidateAntiforgeryTokenIfAuthCookie : Attribute, IFilterFactory, IOrderedFilter
{
    public bool IsReusable => true;

    public int Order => 1000;

    public IFilterMetadata CreateInstance(IServiceProvider serviceProvider)
    {
        return serviceProvider.GetRequiredService<ValidateAntiforgeryTokenIfAuthCookieAuthorizationFilter>();
    }
}
