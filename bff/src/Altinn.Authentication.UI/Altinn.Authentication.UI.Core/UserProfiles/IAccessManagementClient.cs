using Altinn.Authentication.UI.Core.Common.Models;

namespace Altinn.Authentication.UI.Core.UserProfiles;

public interface IAccessManagementClient
{
    Task<AuthorizedPartyExternal?> GetPartyFromReporteeListIfExists(int partyId);

    Task<PartyExternal> GetParty(int partyId);
}
