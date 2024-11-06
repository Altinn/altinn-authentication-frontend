namespace Altinn.Authentication.UI.Core.SystemRegister;

public interface ISystemRegisterService
{
    Task<List<RegisteredSystemDTO>> GetListRegSys(CancellationToken cancellation = default);
    Task<FullRights> GetSystemRights(string systemId, CancellationToken cancellationToken);
}
