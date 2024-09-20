using Altinn.Authentication.UI.Core.Common.Rights;

namespace Altinn.Authentication.UI.Core.SystemRegister;

public interface ISystemRegisterClient
{
    Task<List<RegisterSystemResponse>> GetListRegSys(CancellationToken cancellationToken = default);
    Task<RegisterSystemResponse?> GetSystem(string systemId, CancellationToken cancellationToken = default);
    Task<List<Right>> GetRightFromSystem(string systemId, CancellationToken cancellationToken);
}
