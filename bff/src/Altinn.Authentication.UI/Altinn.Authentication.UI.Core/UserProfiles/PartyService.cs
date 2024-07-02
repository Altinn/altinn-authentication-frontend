using Altinn.Authentication.UI.Core.Common.Models;
using Altinn.Platform.Register.Models;

namespace Altinn.Authentication.UI.Core.UserProfiles;

public class PartyService : IPartyService
{
    private readonly IAccessManagementClient _partyLookUpClient;

    public PartyService(IAccessManagementClient partyLookUpClient)
    {
        _partyLookUpClient = partyLookUpClient;
    }

    public async Task<AuthorizedPartyExternal> GetPartyFromReporteeListIfExists(int partyId)
    {
        AuthorizedPartyExternal party = await _partyLookUpClient.GetPartyFromReporteeListIfExists(partyId);
        return party;
    }

    public async Task<PartyExternal> GetParty(int partyId)
    {
        PartyExternal party = await _partyLookUpClient.GetParty(partyId);
        return party;
    }
}
