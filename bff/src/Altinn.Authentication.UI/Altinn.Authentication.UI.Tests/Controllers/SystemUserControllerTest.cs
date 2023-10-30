using Altinn.Authentication.UI.Controllers;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Mocks.SystemUsers;
using Altinn.Authentication.UI.Mocks.Utils;
using Altinn.Authentication.UI.Tests.Utils;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using Xunit;

namespace Altinn.Authentication.UI.Tests.Controllers;

[Collection ("SystemUserController Tests")]
public class SystemUserControllerTest :IClassFixture<CustomWebApplicationFactory<SystemUserController>>
{
    private readonly CustomWebApplicationFactory<SystemUserController> _factory;
    private readonly HttpClient _client;
    private readonly SystemUserService _systemUserService;

    public SystemUserControllerTest(CustomWebApplicationFactory<SystemUserController> factory)
    {
        _factory = factory;
        _client = SetupUtils.GetTestClient(factory);
        _systemUserService = new SystemUserService(new SystemUserClientMock());
    }

    [Fact]
    public async Task GetSystemUSer_ReturnedOK()
    {
        int partyId = 7007;
        HttpRequestMessage request = new(HttpMethod.Get, $"authfront/api/v1/systemuser/{partyId}");
        string token = PrincipalUtil.GetToken(7007, partyId, 2);
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        HttpResponseMessage response = await _client.SendAsync(request, HttpCompletionOption.ResponseContentRead);
        var result = await response.Content.ReadAsStringAsync();
        List<SystemUserDTO>? list = JsonConvert.DeserializeObject<List<SystemUserDTO>>(result);

        Assert.True(response.IsSuccessStatusCode);
        Assert.True(list is not null);
        Assert.True(list[0].Id is not null);
        Assert.True(list[0].ProductName is not null);
        //Assert.True(list[0].OwnedByPartyId == partyId.ToString());//The DTO has the orgno
        

            
    }

}
