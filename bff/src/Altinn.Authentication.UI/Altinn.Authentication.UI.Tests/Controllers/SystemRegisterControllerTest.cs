using Altinn.Authentication.UI.Controllers;
using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Authentication.UI.Mocks.SystemRegister;
using Altinn.Authentication.UI.Mocks.Utils;
using Altinn.Authentication.UI.Tests.Utils;
using Altinn.Platform.Profile.Models;
using System.Text.Json;
using System.Net;
using System.Net.Http.Headers;
using Xunit;

namespace Altinn.Authentication.UI.Tests.Controllers;

[Collection("SystemRegisterController Tests")]
public class SystemRegisterControllerTest : IClassFixture<CustomWebApplicationFactory<SystemRegisterController>>
{
    private readonly CustomWebApplicationFactory<SystemRegisterController> _factory;
    private readonly HttpClient _client;
    private readonly ISystemRegisterService _systemRegisterService;
    private readonly JsonSerializerOptions jsonSerializerOptions = new() { PropertyNameCaseInsensitive = true };

    public SystemRegisterControllerTest(
        CustomWebApplicationFactory<SystemRegisterController> factory)
    {
        _factory = factory;
        _client = SetupUtils.GetTestClient(_factory, false);
        _systemRegisterService = new SystemRegisterService(new SystemRegisterClientMock());
    }

    [Fact]
    public async Task GetSystemTypeDTOList_ReturnsListOK() 
    {        
        var token = PrincipalUtil.GetToken(7007, 7007, 2);
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        HttpRequestMessage request = new(HttpMethod.Get, $"authfront/api/v1/systemregister");
        HttpResponseMessage response = await _client.SendAsync(request, HttpCompletionOption.ResponseContentRead);

        List<RegisteredSystem>? list = JsonSerializer.Deserialize<List<RegisteredSystem>>(await response.Content.ReadAsStringAsync(), jsonSerializerOptions);
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.True(list is not null && list.Count > 0);        
        Assert.True(list[0].SystemTypeId is not null);
        Assert.True(list[0].SystemVendor is not null);
        Assert.True(list[0].Description is not null);
    }
}

