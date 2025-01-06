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
        IEnumerable<RegisteredSystemDTO> visibleSystems = lista.Where(system => system.IsVisible);

        IEnumerable<string> orgNrs = visibleSystems.Select(x => x.SystemVendorOrgNumber);
        var orgNames = await _registerClient.GetPartyNamesForOrganization(orgNrs, cancellationToken);
        foreach (RegisteredSystemDTO response in visibleSystems)
        {
            try
            {
                response.SystemVendorOrgName = orgNames.Find(x => x.OrgNo == response.SystemVendorOrgNumber)?.Name ?? "N/A";
            }
            catch (Exception ex)
            {
                response.SystemVendorOrgName = "N/A"; // "N/A" stands for "Not Available
                Console.Write(ex.ToString());
            }
        }

        return visibleSystems.ToList();
    }

    public async Task<FullRights> GetSystemRights(string systemId, CancellationToken cancellationToken)
    {
        List<Right> rights = await _systemRegisterClient.GetRightsFromSystem(systemId, cancellationToken);
        
        List<AccessPackage> accessPackages =
        [
            new()
            {
                Id = "urn:altinn:accesspackage:foretaksskatt",
                Urn = "urn:altinn:accesspackage:foretaksskatt",
                Name = "skatt"
            }
        ];

        return await _resourceRegistryClient.GetResourcesForRights(rights, accessPackages, cancellationToken);
    }
}
