using Altinn.Authorization.ProblemDetails;

namespace Altinn.Authentication.UI.Core.SystemUsers;

public interface IChangeRequestService
{
    Task<Result<ChangeRequest>> GetChangeRequest(int partyId, Guid changeRequestId, CancellationToken cancellationToken = default);
    Task<Result<bool>> ApproveChangeRequest(int partyId, Guid changeRequestId, CancellationToken cancellationToken = default);
    Task<Result<bool>> RejectChangeRequest(int partyId, Guid changeRequestId, CancellationToken cancellationToken = default);
    //Task<Result<RedirectUrl>> GetChangeRequestRedirectUrl(Guid changeRequestId, CancellationToken cancellationToken = default);
}
