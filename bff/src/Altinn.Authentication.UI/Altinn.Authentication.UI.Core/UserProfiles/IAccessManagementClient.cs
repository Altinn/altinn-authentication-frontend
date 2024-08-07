using Altinn.Authentication.UI.Core.Common.Models;
using Altinn.Authentication.UI.Core.Common.Rights;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Platform.Register.Models;

namespace Altinn.Authentication.UI.Core.UserProfiles;

public interface IAccessManagementClient
{
    Task<AuthorizedPartyExternal> GetPartyFromReporteeListIfExists(int partyId);

    Task<PartyExternal> GetParty(int partyId);

    Task<List<DelegationResponseData>?> CheckDelegationAccess(string partyId, DelegationCheckRequest request);

    Task<bool> DelegateRightToSystemUser(string reporteePartyId, SystemUser systemUser, List<DelegationResponseData> rights);
}
