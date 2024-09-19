using Altinn.Authorization.ProblemDetails;

namespace Altinn.Authentication.UI.Core.SystemUsers;

public interface IRequestClient
{    
    Task<Result<VendorRequest>> GetVendorRequest(int partyId, Guid requestId, CancellationToken cancellationToken = default);
}
