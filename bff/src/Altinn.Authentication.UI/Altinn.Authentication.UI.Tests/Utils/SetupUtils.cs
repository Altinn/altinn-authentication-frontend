using Altinn.Authentication.UI.Controllers;
using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Authentication.UI.Mocks.Authentication;
using Altinn.Authentication.UI.Mocks.UserProfiles;
using Altinn.Authentication.UI.Mocks;
using Altinn.Authentication.UI.Mocks.Mocks;
using AltinnCore.Authentication.JwtCookie;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Altinn.Common.PEP.Interfaces;
using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Authentication.UI.Mocks.SystemRegister;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Mocks.SystemUsers;

namespace Altinn.Authentication.UI.Tests.Utils;

public static class SetupUtils
{
    public static HttpClient GetTestClient<T>(CustomWebApplicationFactory<T> customerFactory, bool allowRedirect = false)
        where T : class
    {
        WebApplicationFactory<T> factory = customerFactory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureTestServices(services =>
            {
                services.AddTransient<IAuthenticationClient, AuthenticationClientMock>();
                services.AddTransient<ISystemRegisterClient, SystemRegisterClientMock>();
                services.AddTransient<ISystemUserClient, SystemUserClientMock>();
                services.AddTransient<IAccessManagementClient, PartyClientMock>();
                services.AddTransient<IResourceRegistryClient, ResourceRegistryClientMock>();
                services.AddTransient<IUserProfileClient, UserProfileClientMock>();
                services.AddSingleton<IPostConfigureOptions<JwtCookieOptions>, JwtCookiePostConfigureOptionsStub>();
                services.AddSingleton<IPDP, PdpPermitMock>();
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

    public static void AddAltinnPartyCookie(HttpRequestMessage req, string reporteePartyId)
    {
        req.Headers.Add("Cookie", "AltinnPartyId" + "=" + reporteePartyId);
    }
}
