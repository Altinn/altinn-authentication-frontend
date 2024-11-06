using Altinn.Authentication.UI.Core.Common.Rights;

namespace Altinn.Authentication.UI.Core.SystemRegister;

public interface IResourceRegistryClient
{
    Task<List<ServiceResource>> GetResources(IEnumerable<string> resourceIds, CancellationToken cancellationToken = default);

    Task<List<AccessPackage>> GetAccessPackageResources(List<AccessPackage> accessPackages, CancellationToken cancellationToken);
}
