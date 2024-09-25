using Altinn.Authentication.UI.Core.Common.Rights;

namespace Altinn.Authentication.UI.Core.SystemRegister;

public interface IResourceRegistryClient
{
    Task<List<ServiceResource>> GetResources(List<Right> rights, CancellationToken cancellationToken = default);
    Task<ServiceResource?> GetResource(string resourceId, CancellationToken cancellationToken = default);
}
