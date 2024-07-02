﻿using Altinn.Authentication.UI.Core.Common.Models;
using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Platform.Register.Models;

namespace Altinn.Authentication.UI.Mocks.UserProfiles;

public class PartyClientMock : IAccessManagementClient
{
    public async Task<AuthorizedPartyExternal> GetPartyFromReporteeListIfExists(int partyId)
    {
        AuthorizedPartyExternal mock = new()
        {
            PartyId = 5001,    
            OrganizationNumber = "123456789MVA",
            Name = "Framifrå Verksemd AS"
        };

        return mock;
    }

    public async Task<PartyExternal> GetParty(int partyId)
    {
        throw new NotImplementedException();
    }

    public Task<List<DelegationResponseData>?> CheckDelegationAccess(string partyId, Right request)
    {
        throw new NotImplementedException();
    }
}
