namespace Altinn.Authentication.UI.Core.SystemRegister;

public interface ISystemRegisterClient
{
    Task<List<RegisteredSystemDTO>> GetListRegSys(CancellationToken cancellationToken = default);
}
