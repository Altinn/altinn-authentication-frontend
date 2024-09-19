using Altinn.Authorization.ProblemDetails;

namespace Altinn.Authentication.UI.Core.SystemUsers;

/// <summary>
/// Request Service
/// </summary>
/// <param name="requestClient">The client</param>
public class RequestService(
    IRequestClient requestClient
    ) : IRequestService
{
    public async Task<Result<VendorRequest>> GetVendorRequest(int partyId, Guid requestId, CancellationToken cancellationToken = default)
    {
        return await requestClient.GetVendorRequest(partyId, requestId, cancellationToken);
    }
}
