﻿using Altinn.Authentication.UI.Core.Common.Rights;

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
        
        IEnumerable<string> orgNrs = lista.Select(x => x.SystemVendorOrgNumber);
        var orgNames = await _registerClient.GetPartyNamesForOrganization(orgNrs, cancellationToken);
        foreach (RegisteredSystemDTO response in lista)
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

        return lista;
    }

    public async Task<FullRights> GetSystemRights(string systemId, CancellationToken cancellationToken)
    {
        List<Right> rights = await _systemRegisterClient.GetRightsFromSystem(systemId, cancellationToken);
        List<ServiceResource> resources = await _resourceRegistryClient.GetResources(RightsHelper.GetResourceIdsFromRights(rights), cancellationToken); 
        
        List<AccessPackage> packagesForRequest =
        [
            new()
            {
                Id = "urn:altinn:accesspackage:foretaksskatt",
                Urn = "urn:altinn:accesspackage:foretaksskatt",
                Name = "skatt"
            }
        ];
        List<AccessPackage> accessPackages = await _resourceRegistryClient.GetAccessPackageResources(packagesForRequest, cancellationToken);
        return new FullRights()
        {
            Resources = resources,
            AccessPackages = accessPackages
        };
    }
}
