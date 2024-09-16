using Altinn.Authentication.UI.Controllers;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Mocks.Utils;
using Altinn.Authentication.UI.Tests.Utils;
using System.Text.Json;
using System.Net.Http.Headers;
using Xunit;

namespace Altinn.Authentication.UI.Tests.Controllers;

[Collection ("SystemUserController Unit Tests")]
public class SystemUserControllerTest :IClassFixture<CustomWebApplicationFactory<SystemUserController>>
{
    private readonly CustomWebApplicationFactory<SystemUserController> _factory;
    private readonly HttpClient _client;
    private readonly JsonSerializerOptions jsonOptions = new()
    {
        PropertyNameCaseInsensitive = true 
    };

    public SystemUserControllerTest(CustomWebApplicationFactory<SystemUserController> factory)
    {
        _factory = factory;
        _client = SetupUtils.GetTestClient(_factory);
    }

    [Fact]
    public async Task GetSystemUserDTO_ReturnedOK()
    {
        int partyId = 7007;
        HttpRequestMessage request = new(HttpMethod.Get, $"authfront/api/v1/systemuser");
        string token = PrincipalUtil.GetToken(7007, partyId, 2);
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        SetupUtils.AddAuthCookie(request, token, "AltinnStudioRuntime");
        SetupUtils.AddAltinnPartyCookie(request, "5001");

        HttpResponseMessage response = await _client.SendAsync(request, HttpCompletionOption.ResponseContentRead);
        var result = await response.Content.ReadAsStringAsync();

        List<SystemUser>? list = JsonSerializer.Deserialize<List<SystemUser>>(result, jsonOptions);

        Assert.True(response.IsSuccessStatusCode);
        Assert.True(list is not null);
        Assert.True(list[0].Id is not null);
        Assert.True(list[0].SystemId is not null);
    }
}
