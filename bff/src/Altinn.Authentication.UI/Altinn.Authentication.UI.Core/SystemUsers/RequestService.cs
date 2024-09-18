﻿using Altinn.Authorization.ProblemDetails;

namespace Altinn.Authentication.UI.Core.SystemUsers;

internal class RequestService(
    IRequestClient requestClient
    ) : IRequestService
{
    public Task<Result<VendorRequest>> GetVendorRequest(int partyId, Guid requestId)
    {
        return requestClient.GetVendorRequest(partyId, requestId);
    }
}
