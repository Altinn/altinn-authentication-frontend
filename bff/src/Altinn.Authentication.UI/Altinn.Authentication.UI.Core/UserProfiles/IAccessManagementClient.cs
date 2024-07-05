﻿using Altinn.Authentication.UI.Core.Common.Models;
using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Platform.Register.Models;

namespace Altinn.Authentication.UI.Core.UserProfiles;

public interface IAccessManagementClient
{
    Task<AuthorizedPartyExternal> GetPartyFromReporteeListIfExists(int partyId);

    Task<PartyExternal> GetParty(int partyId);

    Task<List<DelegationResponseData>?> CheckDelegationAccess(string partyId, List<Right> request);

    Task<bool> DelegateRightToSystemUser(string reporteePartyId, SystemUser systemUser, List<Right> rights);
}
