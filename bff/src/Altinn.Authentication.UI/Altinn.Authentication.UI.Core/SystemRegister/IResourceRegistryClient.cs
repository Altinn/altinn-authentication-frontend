using Altinn.Authentication.UI.Core.Common.Rights;

namespace Altinn.Authentication.UI.Core.SystemRegister;

public interface IResourceRegistryClient
{
    Task<FullRights> GetResourcesForRights(IEnumerable<Right> rights, IEnumerable<AccessPackage> accessPackages, CancellationToken cancellationToken);
}
