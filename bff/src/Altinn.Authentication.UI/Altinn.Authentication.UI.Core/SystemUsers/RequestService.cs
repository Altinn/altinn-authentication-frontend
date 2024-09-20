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
            foreach (RightFrontEnd right in request.Value.Rights)
            {
                string? resourceId = right.Resource.Find(x => x.Id == "urn:altinn:resource")?.Value;
                
                if (resourceId != null) 
                {
                    right.ServiceResource = await resourceRegistryClient.GetResource(resourceId, cancellationToken);
                }
            }

            // add system
            RegisterSystemResponse? system = await systemRegisterClient.GetSystem(request.Value.SystemId, cancellationToken);
            if (system != null)
            {
                try
                {
                    system.SystemVendorOrgName = (await registerClient.GetPartyForOrganization(system.SystemVendorOrgNumber)).Organization.Name;
                }
                catch (Exception ex)
                {
                    system.SystemVendorOrgName = "N/A"; // "N/A" stands for "Not Available
                    Console.Write(ex.ToString());
                }
            }
           
            request.Value.System = system;
        }
        

        return request;
    }

    public async Task<Result<bool>> ApproveRequest(int partyId, Guid requestId, CancellationToken cancellationToken = default)
    {
        return await requestClient.ApproveRequest(partyId, requestId, cancellationToken);
    }
}
