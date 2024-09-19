using Altinn.Authorization.ProblemDetails;

namespace Altinn.Authentication.UI.Core.SystemUsers;

/// <summary>
/// Request Service
/// </summary>
/// <param name="requestClient">The client</param>
internal class RequestService(
    IRequestClient requestClient
    ) : IRequestService
{
    public Task<Result<VendorRequest>> GetVendorRequest(int partyId, Guid requestId)
    {
        return requestClient.GetVendorRequest(partyId, requestId);
    }
}
