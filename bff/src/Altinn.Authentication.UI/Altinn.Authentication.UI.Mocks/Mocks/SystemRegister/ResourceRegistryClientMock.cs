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

    public async Task<ServiceResource> GetResource(string resourceId, CancellationToken cancellationToken = default)
    {
        return await MockTestHelper();
    }

    public Task<List<ServiceResource>> GetResources(List<Right> rights, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
