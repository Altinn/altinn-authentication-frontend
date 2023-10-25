using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Platform.Register.Models;

namespace Altinn.Authentication.UI.Mock.UserProfiles;

public class PartyClientMock : IPartyClient
{
    public async Task<Party> GetPartyFromReporteeListIfExists(int partyId)
    {
        Party mock = new()
        {
            PartyId = 5001,    
            OrgNumber = "123456789MVA",
            Name = "Framifrå Bedrift AS"
        };

        return mock;
    }
}
