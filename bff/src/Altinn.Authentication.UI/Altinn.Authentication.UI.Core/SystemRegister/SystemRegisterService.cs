namespace Altinn.Authentication.UI.Core.SystemRegister;

public class SystemRegisterService : ISystemRegisterService
{
    ISystemRegisterClient _systemRegisterClient;

    public SystemRegisterService(ISystemRegisterClient systemRegisterClient)
    {
        _systemRegisterClient = systemRegisterClient;
    }

    public async Task<List<RegisteredSystemDTO>> GetListRegSys(CancellationToken cancellationToken)
    {
        List<RegisteredSystemDTO> lista = new();

        lista = await _systemRegisterClient.GetListRegSys();

        return lista;
    }
}
