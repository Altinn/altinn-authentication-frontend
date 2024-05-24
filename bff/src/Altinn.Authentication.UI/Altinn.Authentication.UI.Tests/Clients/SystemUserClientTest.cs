using Altinn.Authentication.UI.Controllers;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Integration.SystemUsers;
using Altinn.Authentication.UI.Mocks.SystemUsers;
using Altinn.Authentication.UI.Tests.Utils;
using Xunit;

namespace Altinn.Authentication.UI.Tests.Clients;

/// <summary>
/// Needs a running instance of the Authentication Component on localhost on port 44377
/// </summary>
[Collection ("SystemUserClient Integration Test vs Authentication Component")]
public class SystemUserClientIntegrationTest : IClassFixture<CustomWebApplicationFactory<SystemUserController>>
{
    private readonly ISystemUserClient _systemUserClient;

    public SystemUserClientIntegrationTest()
    {
        _systemUserClient = new SystemUserClientMock(
            new HttpClient{BaseAddress = new UriBuilder("https://localhost:44377/").Uri});
    }

    [Fact]
    public async Task GetListOfSystemUserForParty_ReturnOk()
    {
        var list = await _systemUserClient.GetSystemUserRealsForChosenUser(1);

        Assert.True(list?.Count > 0);
    }

    [Fact]
    public async Task GetSpecificSystemUserById_ReturnOk()
    {
        var list = await _systemUserClient.GetSystemUserRealsForChosenUser(1);
        var usr = await _systemUserClient.GetSpecificSystemUserReal(1, Guid.Parse(list[0].Id!));

        Assert.True(usr is not null);
    }

    [Fact]
    public async Task CreateSystemUser_ReturnOk()
    {
        var usr = await _systemUserClient.PostNewSystemUserReal(
            1,
            new SystemUserDescriptor 
            { 
                OwnedByPartyId = "1",
                SelectedSystemType = "IntegrationTest ProductName",
                IntegrationTitle = "IntegrationTest Title"
            });

        Assert.True(usr is not null);
    }





}
