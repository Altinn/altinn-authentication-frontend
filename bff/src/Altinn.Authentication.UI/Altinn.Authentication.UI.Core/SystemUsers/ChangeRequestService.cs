using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Authorization.ProblemDetails;

namespace Altinn.Authentication.UI.Core.SystemUsers;

/// <summary>
/// Change Request Service
/// </summary>
/// <param name="changeRequestClient">The client</param>
public class ChangeRequestService(
    IChangeRequestClient changeRequestClient,
    IResourceRegistryClient resourceRegistryClient,
    ISystemRegisterClient systemRegisterClient,
    IRegisterClient registerClient
    ) : IChangeRequestService
{
    public async Task<Result<ChangeRequest>> GetChangeRequest(int partyId, Guid requestId, CancellationToken cancellationToken = default)
    {
        Result<ChangeRequest> request = await changeRequestClient.GetChangeRequest(partyId, requestId, cancellationToken);
        
        if (request.Value != null) 
        {
            // add resources
            request.Value.RequiredResources = await resourceRegistryClient.GetResources(request.Value.RequiredRights, cancellationToken);
            request.Value.UnwantedResources = await resourceRegistryClient.GetResources(request.Value.UnwantedRights, cancellationToken);

            // add system
            RegisteredSystemDTO? system = await systemRegisterClient.GetSystem(request.Value.SystemId, cancellationToken);
            request.Value.System = system;

            if (request.Value.System != null)
            {
                 // add system name
                try
                {
                    request.Value.System.SystemVendorOrgName =
                        (await registerClient.GetPartyNamesForOrganization([request.Value.System.SystemVendorOrgNumber], cancellationToken))[0].Name;
                }
                catch (Exception ex)
                {
                    request.Value.System.SystemVendorOrgName = "N/A"; // "N/A" stands for "Not Available
                    Console.Write(ex.ToString());
                }
            }
        }
        
        return request;
    }

    public async Task<Result<bool>> ApproveChangeRequest(int partyId, Guid requestId, CancellationToken cancellationToken = default)
    {
        return await changeRequestClient.ApproveChangeRequest(partyId, requestId, cancellationToken);
    }

    public async Task<Result<bool>> RejectChangeRequest(int partyId, Guid requestId, CancellationToken cancellationToken = default)
    {
        return await changeRequestClient.RejectChangeRequest(partyId, requestId, cancellationToken);
    }
}
