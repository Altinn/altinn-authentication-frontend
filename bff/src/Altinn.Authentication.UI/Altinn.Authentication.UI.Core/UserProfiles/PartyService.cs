using Altinn.Platform.Register.Models;

namespace Altinn.Authentication.UI.Core.UserProfiles;

public class PartyService : IPartyService
{
    private readonly IPartyClient _partyLookUpClient;

    public async Task<Party> GetPartyFromReporteeListIfExists(int partyId)
    {
        Party party = await _partyLookUpClient.GetPartyFromReporteeListIfExists(partyId);
        return party;
    }
}
