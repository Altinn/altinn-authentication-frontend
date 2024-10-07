using Altinn.Authentication.UI.Core.Common.Rights;

namespace Altinn.Authentication.UI.Core.SystemRegister;

public class SystemRegisterService : ISystemRegisterService
{
    ISystemRegisterClient _systemRegisterClient;
    IRegisterClient _registerClient;
    IResourceRegistryClient _resourceRegistryClient;

    public SystemRegisterService(
        ISystemRegisterClient systemRegisterClient,
        IRegisterClient registerClient,
        IResourceRegistryClient resourceRegistryClient)
    {
        _systemRegisterClient = systemRegisterClient;
        _registerClient = registerClient;
        _resourceRegistryClient = resourceRegistryClient;
    }

    public async Task<List<RegisteredSystemDTO>> GetListRegSys(CancellationToken cancellationToken)
    {
        List<RegisteredSystemDTO> lista = await _systemRegisterClient.GetListRegSys(cancellationToken);
        foreach (RegisteredSystemDTO response in lista)
        {
            try
            {
                response.SystemVendorOrgName =
                    (await _registerClient.GetPartyForOrganization(response.SystemVendorOrgNumber, cancellationToken)).Organization.Name;
            }
            catch (Exception ex)
            {
                response.SystemVendorOrgName = "N/A"; // "N/A" stands for "Not Available
                Console.Write(ex.ToString());
            }
        }

        return lista;
    }

    public async Task<List<ServiceResource>> GetSystemRights(string systemId, CancellationToken cancellationToken)
    {
        List<Right> right = await _systemRegisterClient.GetRightsFromSystem(systemId, cancellationToken);
        return await _resourceRegistryClient.GetResources(right, cancellationToken); 
    }
}
