namespace Altinn.Authentication.UI.Core.SystemRegister;

public interface IResourceRegistryClient
{
    Task<ServiceResource?> GetResource(string resourceId, CancellationToken cancellationToken = default);
}
