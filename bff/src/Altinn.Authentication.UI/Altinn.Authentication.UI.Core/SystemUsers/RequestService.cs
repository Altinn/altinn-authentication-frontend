using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Authorization.ProblemDetails;

namespace Altinn.Authentication.UI.Core.SystemUsers;

/// <summary>
/// Request Service
/// </summary>
/// <param name="requestClient">The client</param>
public class RequestService(
    IRequestClient requestClient,
    IResourceRegistryClient resourceRegistryClient,
    ISystemRegisterClient systemRegisterClient,
    IRegisterClient registerClient
    ) : IRequestService
{
    public async Task<Result<VendorRequest>> GetVendorRequest(int partyId, Guid requestId, CancellationToken cancellationToken = default)
    {
        Result<VendorRequest> request = await requestClient.GetVendorRequest(partyId, requestId, cancellationToken);
        
        if (request.Value != null) 
        {
            // add resources
            request.Value.Resources = await resourceRegistryClient.GetResources(request.Value.Rights, cancellationToken);

            // add system
            RegisterSystemResponse? system = await systemRegisterClient.GetSystem(request.Value.SystemId, cancellationToken);
            request.Value.System = system;

            // add system name
            try
            {
                request.Value.System.SystemVendorOrgName =
                    (await registerClient.GetPartyForOrganization(request.Value.System.SystemVendorOrgNumber)).Organization.Name;
            }
            catch (Exception ex)
            {
                request.Value.System.SystemVendorOrgName = "N/A"; // "N/A" stands for "Not Available
                Console.Write(ex.ToString());
            }
        }
        

        return request;
    }

    public async Task<Result<bool>> ApproveRequest(int partyId, Guid requestId, CancellationToken cancellationToken = default)
    {
        return await requestClient.ApproveRequest(partyId, requestId, cancellationToken);
    }

    public async Task<Result<bool>> RejectRequest(int partyId, Guid requestId, CancellationToken cancellationToken = default)
    {
        return await requestClient.RejectRequest(partyId, requestId, cancellationToken);
    }
}
