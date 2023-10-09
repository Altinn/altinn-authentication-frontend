using Altinn.Authentication.UI.Controllers;
using Altinn.Authentication.UI.Mocks;
using Altinn.Authentication.UI.Mocks.Mocks;
using AltinnCore.Authentication.JwtCookie;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;


namespace Altinn.Authentication.UI.Tests.Utils;

public static class SetupUtils
{
    public static HttpClient GetTestClient(CustomWebApplicationFactory<HomeController> customerFactory, bool allowRedirect = false)
    {
        WebApplicationFactory<HomeController> factory = customerFactory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureTestServices(services =>
            {

                //services.AddTransient<IResourceRegistryClient, ResourceRegistryClientMock>();
                //services.AddTransient<IAuthenticationClient, AuthenticationMock>();
                //services.AddTransient<IProfileClient, ProfileClientMock>();

                services.AddSingleton<IPostConfigureOptions<JwtCookieOptions>, JwtCookiePostConfigureOptionsStub>();
            });
        });

        WebApplicationFactoryClientOptions opts = new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = allowRedirect
        };
        factory.Server.AllowSynchronousIO = true;

        return factory.CreateClient(opts);

    }
    /// <summary>
    ///  Adds an auth cookie to the request message
    /// </summary>
    /// <param name="req"></param>
    /// <param name="token"></param>
    /// <param name="cookiename"></param>
    /// <param name="xsrfToken"></param>
    public static void AddAuthCookie(HttpRequestMessage req, string token, string cookiename, string? xsrfToken = null)
    {
        req.Headers.Add("Cookie", cookiename + "=" + token);
        if (xsrfToken != null)
        {
            req.Headers.Add("X-XSRF-TOKEN", xsrfToken);
        }
    }
}
