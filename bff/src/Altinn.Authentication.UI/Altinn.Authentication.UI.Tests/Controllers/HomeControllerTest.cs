using Altinn.Authentication.UI;
using Altinn.Authentication.UI.Tests.Utils;
using Altinn.Authentication.UI.Controllers;
using Altinn.Authentication.UI.Mocks.Utils;
using Xunit;
using System.Net.Http.Headers;

namespace Altinn.Authentication.UI.Tests.Controllers
{
    [Collection ("HomeController Tests")]
    public class HomeControllerTest : IClassFixture<CustomWebApplicationFactory<HomeController>>
    {
        private readonly CustomWebApplicationFactory<HomeController> _factory;

        public HomeControllerTest(CustomWebApplicationFactory<HomeController> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task Index_Authenticated()
        {
            HttpClient client = SetupUtils.GetTestClient(_factory, false);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            string token = PrincipalUtil.GetAccessToken("sbl.authorization");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);


        }

    }
}
