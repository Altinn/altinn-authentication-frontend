using Altinn.Authentication.UI.Controllers;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Mocks.SystemUsers;
using Altinn.Authentication.UI.Mocks.Utils;
using Altinn.Authentication.UI.Tests.Utils;
using System.Text.Json;
using System.Net.Http.Headers;
using System.Security.Policy;
using Xunit;

namespace Altinn.Authentication.UI.Tests.Controllers;

[Collection ("SystemUserController Unit Tests")]
public class SystemUserControllerTest :IClassFixture<CustomWebApplicationFactory<SystemUserController>>
{
    private readonly CustomWebApplicationFactory<SystemUserController> _factory;
    private readonly HttpClient _client;
    private readonly SystemUserService _systemUserService;
    private readonly JsonSerializerOptions jsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public SystemUserControllerTest(CustomWebApplicationFactory<SystemUserController> factory)
    {
        _factory = factory;
        _client = SetupUtils.GetTestClient(factory);
        _systemUserService = new SystemUserService(new SystemUserClientMock(_client));
    }

    [Fact]
    public async Task GetSystemUserDTO_ReturnedOK()
    {
        int partyId = 7007;
        HttpRequestMessage request = new(HttpMethod.Get, $"authfront/api/v1/systemuser");
        string token = PrincipalUtil.GetToken(7007, partyId, 2);
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        HttpResponseMessage response = await _client.SendAsync(request, HttpCompletionOption.ResponseContentRead);
        var result = await response.Content.ReadAsStringAsync();

        List<SystemUserDTO>? list = JsonSerializer.Deserialize<List<SystemUserDTO>>(result, jsonOptions);

        Assert.True(response.IsSuccessStatusCode);
        Assert.True(list is not null);
        Assert.True(list[0].Id is not null);
        Assert.True(list[0].ProductName is not null);
    }
}
