using Altinn.Authentication.UI.Core.Common.Models;
using Altinn.Platform.Register.Models;

namespace Altinn.Authentication.UI.Core.UserProfiles;

public class PartyService : IPartyService
{
    private readonly IPartyClient _partyLookUpClient;

    public PartyService(IPartyClient partyLookUpClient)
    {
        _partyLookUpClient = partyLookUpClient;
    }

    public async Task<AuthorizedPartyExternal> GetPartyFromReporteeListIfExists(int partyId)
    {
        AuthorizedPartyExternal party = await _partyLookUpClient.GetPartyFromReporteeListIfExists(partyId);
        return party;
    }
}
