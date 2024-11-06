using Altinn.Authentication.UI.Core.Common.Rights;
using Altinn.Authentication.UI.Core.SystemRegister;

namespace Altinn.Authentication.UI.Mocks.SystemRegister;

public class ResourceRegistryClientMock : IResourceRegistryClient
{
    private static async Task<ServiceResource> MockTestHelper()
    {
        await Task.Delay(250);

        ServiceResource resource1 = new()
        {
            Identifier = "test",
        };

        return resource1;
    }

    public Task<FullRights> GetResourcesForRights(List<Right> rights, List<AccessPackage> accessPackages, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
