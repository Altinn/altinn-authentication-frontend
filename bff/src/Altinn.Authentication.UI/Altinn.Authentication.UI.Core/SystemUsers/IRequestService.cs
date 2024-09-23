using Altinn.Authorization.ProblemDetails;

namespace Altinn.Authentication.UI.Core.SystemUsers;

public interface IRequestService
{
    Task<Result<VendorRequest>> GetVendorRequest(int partyId, Guid requestId, CancellationToken cancellationToken = default);
    Task<Result<bool>> ApproveRequest(int partyId, Guid requestId, CancellationToken cancellationToken = default);
    Task<Result<bool>> RejectRequest(int partyId, Guid requestId, CancellationToken cancellationToken = default);
}
