using Altinn.Authorization.ProblemDetails;

namespace Altinn.Authentication.UI.Core.SystemUsers;

public interface IChangeRequestClient
{    
    Task<Result<ChangeRequest>> GetChangeRequest(int partyId, Guid requestId, CancellationToken cancellationToken = default);
    Task<Result<bool>> ApproveChangeRequest(int partyId, Guid requestId, CancellationToken cancellationToken = default);
    Task<Result<bool>> RejectChangeRequest(int partyId, Guid requestId, CancellationToken cancellationToken = default);
}
