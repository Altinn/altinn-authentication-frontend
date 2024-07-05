namespace Altinn.Authentication.UI.Core.SystemRegister;

public interface ISystemRegisterClient
{
    Task<List<RegisterSystemResponse>> GetListRegSys(CancellationToken cancellationToken = default);
}
