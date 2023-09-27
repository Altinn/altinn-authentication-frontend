using Altinn.Authentication.UI.Controllers;
using Altinn.Authentication.UI.Mocks;
using AltinnCore.Authentication.JwtCookie;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;


namespace Altinn.Authentication.UI.Tests.Utils
{
    public static class SetupUtils
    {
        public static HttpClient GetTestClient(CustomWebApplicationFactory<HomeController> customerFactory, bool allowRedirect = false)
        {
            WebApplicationFactory<HomeController> factory = customerFactory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureTestServices(services =>
                {
                    //services.AddTransient<>
                });
            });

            WebApplicationFactoryClientOptions opts = new WebApplicationFactoryClientOptions
            {
                AllowAutoRedirect = allowRedirect
            };
            factory.Server.AllowSynchronousIO = true;

            return factory.CreateClient(opts);

        }
    }
}
