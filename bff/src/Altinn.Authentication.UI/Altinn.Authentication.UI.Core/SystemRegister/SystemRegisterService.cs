namespace Altinn.Authentication.UI.Core.SystemRegister;

public class SystemRegisterService : ISystemRegisterService
{
    ISystemRegisterClient _systemRegisterClient;
    IRegisterClient _registerClient;

    public SystemRegisterService(
        ISystemRegisterClient systemRegisterClient,
        IRegisterClient registerClient)
    {
        _systemRegisterClient = systemRegisterClient;
        _registerClient = registerClient;
    }

    public async Task<List<RegisterSystemResponse>> GetListRegSys(CancellationToken cancellationToken)
    {
        List<RegisterSystemResponse> lista = [];

        lista = await _systemRegisterClient.GetListRegSys(cancellationToken );

        foreach (RegisterSystemResponse response in lista)
        {
            try
            {
                response.SystemVendorOrgName =
                (await _registerClient.GetPartyForOrganization(response.SystemVendorOrgNumber)).Organization.Name;
            }
            catch(Exception ex)
            {
                Console.Write(ex.ToString());
            }
        }

        return lista;
    }
}
