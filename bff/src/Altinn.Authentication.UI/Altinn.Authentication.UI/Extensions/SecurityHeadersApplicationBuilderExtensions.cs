using Altinn.Authentication.UI.Middleware;

namespace Altinn.Authentication.UI.Extensions
{
    public static class SecurityHeadersApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseDefaultSecurityHeaders(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SecurityHeadersMiddleware>();
        }
    }
}
