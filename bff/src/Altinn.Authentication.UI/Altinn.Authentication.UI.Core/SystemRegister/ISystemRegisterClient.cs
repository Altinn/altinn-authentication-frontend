namespace Altinn.Authentication.UI.Core.SystemRegister;

public interface ISystemRegisterClient
{
    Task<List<RegisteredSystem>> GetListRegSys(CancellationToken cancellationToken = default);
}
