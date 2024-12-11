using Altinn.Authentication.UI.Core.Common.Models;
using Altinn.Authentication.UI.Core.Common.Rights;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Core.UserProfiles;

namespace Altinn.Authentication.UI.Mocks.UserProfiles;

public class PartyClientMock : IAccessManagementClient

{
    public async Task<AuthorizedPartyExternal> GetPartyFromReporteeListIfExists(int partyId)
    {
        AuthorizedPartyExternal mock = new()
        {
            PartyId = 5001,    
            OrganizationNumber = "123456789",
            Name = "Framifrå Verksemd AS"
        };

        return mock;
    }

    public async Task<PartyExternal> GetParty(int partyId)
    {
        return new()
        {
            PartyId = partyId,
            Name = "TestUserName"
        };
    }
}
