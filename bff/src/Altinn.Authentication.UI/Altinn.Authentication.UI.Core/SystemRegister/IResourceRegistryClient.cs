using Altinn.Authentication.UI.Core.Common.Rights;

namespace Altinn.Authentication.UI.Core.SystemRegister;

public interface IResourceRegistryClient
{
    Task<FullRights> GetResourcesForRights(List<Right> rights, List<AccessPackage> accessPackages, CancellationToken cancellationToken);
}
