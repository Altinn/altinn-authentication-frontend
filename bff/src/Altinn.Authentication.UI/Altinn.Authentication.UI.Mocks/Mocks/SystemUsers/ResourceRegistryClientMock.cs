using Altinn.Authentication.UI.Core.Resource;
using Altinn.Authentication.UI.Core.SystemUsers;

namespace Altinn.Authentication.UI.Mocks.SystemUsers;

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

    public async Task<ServiceResource> GetResource(string resourceId, CancellationToken cancellationToken = default)
    {
        return await MockTestHelper();
    }
}
