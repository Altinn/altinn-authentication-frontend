namespace Altinn.Authentication.UI.Core.SystemRegister;

public interface ISystemRegisterService
{
    Task<List<RegisterSystemResponse>> GetListRegSys(CancellationToken cancellation = default);
}
