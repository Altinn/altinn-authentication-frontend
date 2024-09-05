using Altinn.Authentication.UI.Core.Resource;

namespace Altinn.Authentication.UI.Core.SystemUsers;

public interface IResourceRegistryClient
{
    Task<ServiceResource?> GetResource(string resourceId, CancellationToken cancellationToken = default);
}
