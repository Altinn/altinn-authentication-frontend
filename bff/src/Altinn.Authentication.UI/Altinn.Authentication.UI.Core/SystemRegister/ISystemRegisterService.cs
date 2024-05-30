namespace Altinn.Authentication.UI.Core.SystemRegister;

public interface ISystemRegisterService
{
    Task<List<RegisteredSystem>> GetListRegSys(CancellationToken cancellation = default);
}
