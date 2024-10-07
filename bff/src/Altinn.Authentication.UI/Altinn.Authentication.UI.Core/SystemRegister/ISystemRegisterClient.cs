using Altinn.Authentication.UI.Core.Common.Rights;

namespace Altinn.Authentication.UI.Core.SystemRegister;

public interface ISystemRegisterClient
{
    Task<List<RegisteredSystemDTO>> GetListRegSys(CancellationToken cancellationToken = default);
    Task<RegisteredSystemDTO?> GetSystem(string systemId, CancellationToken cancellationToken = default);
    Task<List<Right>> GetRightFromSystem(string systemId, CancellationToken cancellationToken);
}
