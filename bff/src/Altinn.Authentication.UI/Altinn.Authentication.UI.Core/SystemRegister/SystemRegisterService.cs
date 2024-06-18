namespace Altinn.Authentication.UI.Core.SystemRegister;

public class SystemRegisterService : ISystemRegisterService
{
    ISystemRegisterClient _systemRegisterClient;

    public SystemRegisterService(ISystemRegisterClient systemRegisterClient)
    {
        _systemRegisterClient = systemRegisterClient;
    }

    public async Task<List<RegisterSystemResponse>> GetListRegSys(CancellationToken cancellationToken)
    {
        List<RegisterSystemResponse> lista = [];

        lista = await _systemRegisterClient.GetListRegSys(cancellationToken );

        return lista;
    }
}
