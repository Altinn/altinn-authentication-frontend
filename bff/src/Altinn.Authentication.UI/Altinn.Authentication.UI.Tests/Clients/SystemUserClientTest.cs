using Altinn.Authentication.UI.Integration.SystemUsers;
using Altinn.Authentication.UI.Tests.Utils;
using Xunit;

namespace Altinn.Authentication.UI.Tests.Clients;

/// <summary>
/// Needs a running instance of the Authentication Component on port 
/// </summary>
[Collection ("SystemUserClient Integration Test vs Authentication Component")]
public class SystemUserClientTest : IClassFixture<CustomWebApplicationFactory<SystemUserClient>>
{
    private readonly CustomWebApplicationFactory<SystemUserClient> _factory;
    private readonly HttpClient _httpClient;
    private readonly SystemUserClient _systemUserClient;

    public SystemUserClientTest(
        CustomWebApplicationFactory<SystemUserClient> factory)
    {
        _factory = factory;
        _httpClient = SetupUtils.GetTestClient(factory);
        _systemUserClient = new SystemUserClient();
    }

    [Fact(Skip = "incomplete")]
    public async Task GetListOfSystemUserForParty_ReturnOk()
    {
        _systemUserClient.GetSystemUserRealsForChosenUser(1);
    }

    [Fact(Skip = "incomplete")]
    public async Task GetSpecificSystemUserById_ReturnOk()
    {

    }

    [Fact(Skip = "incomplete")]
    public async Task CreateSystemUser_ReturnOk()
    {

    }





}
