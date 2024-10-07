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

    public async Task<List<RegisterSystemResponse>> GetListRegSys(CancellationToken cancellationToken)
    {
        List<RegisterSystemResponse> lista = await _systemRegisterClient.GetListRegSys(cancellationToken);
        foreach (RegisterSystemResponse response in lista)
        {
            try
            {
                response.SystemVendorOrgName =
                    (await _registerClient.GetPartyForOrganization(response.SystemVendorOrgNumber)).Organization.Name;
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
        List<Right> right = await _systemRegisterClient.GetRightFromSystem(systemId, cancellationToken);
        return await _resourceRegistryClient.GetResources(right, cancellationToken); 
    }
}
