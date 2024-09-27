﻿namespace Altinn.Authentication.UI.Core.SystemRegister;

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
        List<RegisterSystemResponse> lista = await _systemRegisterClient.GetListRegSys(cancellationToken );
        IEnumerable<RegisterSystemResponse> visibleSystems = lista.Where(system => system.IsVisible);
        
        foreach (RegisterSystemResponse response in visibleSystems)
        {
            response.Resources = await _resourceRegistryClient.GetResources(response.Rights, cancellationToken);

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

        return visibleSystems.ToList();
    }

    public async Task<List<ServiceResource>> GetSystemRights(string systemId, CancellationToken cancellationToken)
    {
        return await _systemRegisterClient.GetRightFromSystem(systemId, cancellationToken);
    }
}
