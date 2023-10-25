using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Platform.Register.Models;

namespace Altinn.Authentication.UI.Integration.UserProfiles;

public class PartyClient : IPartyClient
{
    public async Task<Party> GetPartyFromReporteeListIfExists(int partyId)
    {
        Party mock = new()
        {
            PartyId = 123456789            
        };

        return mock;
    }
}
