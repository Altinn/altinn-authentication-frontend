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
        List<RegisterSystemResponse> lista = [];

        lista = await _systemRegisterClient.GetListRegSys(cancellationToken );

        foreach (RegisterSystemResponse response in lista)
        {
            foreach (RightFrontEnd right in response.Rights) 
            {
                string? resourceId = right.Resource.Find(x => x.Id == "urn:altinn:resource")?.Value;
                
                if (resourceId != null) 
                {
                    right.ServiceResource = await _resourceRegistryClient.GetResource(resourceId, cancellationToken);;
                }
            }

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
}
