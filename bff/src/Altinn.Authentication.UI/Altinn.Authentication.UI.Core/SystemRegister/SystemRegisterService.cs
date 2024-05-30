namespace Altinn.Authentication.UI.Core.SystemRegister;

public class SystemRegisterService : ISystemRegisterService
{
    ISystemRegisterClient _systemRegisterClient;

    public SystemRegisterService(ISystemRegisterClient systemRegisterClient)
    {
        _systemRegisterClient = systemRegisterClient;
    }

    public async Task<List<RegisteredSystem>> GetListRegSys(CancellationToken cancellationToken)
    {
        List<RegisteredSystem> lista = [];

        lista = await _systemRegisterClient.GetListRegSys(cancellationToken );

        return lista;
    }
}
