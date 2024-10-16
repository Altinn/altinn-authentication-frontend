using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Authentication.UI.Integration.Configuration;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;
using Altinn.Authentication.UI.Core.Common.Rights;

namespace Altinn.Authentication.UI.Integration.SystemRegister;

public class ResourceRegistryClient : IResourceRegistryClient
{
    private readonly ILogger _logger;
    private readonly HttpClient _httpClient;
    private readonly PlatformSettings _platformSettings;
    private readonly JsonSerializerOptions _jsonSerializerOptions = new() { PropertyNameCaseInsensitive = true };

    public ResourceRegistryClient(
        ILogger<SystemRegisterClient> logger,
        HttpClient httpClient,
        IOptions<PlatformSettings> platformSettings)
    {
        _logger = logger;
        _platformSettings = platformSettings.Value;
        httpClient.BaseAddress = new Uri(_platformSettings!.ResourceRegistryEndpoint);
        _httpClient = httpClient;
    }

    public async Task<List<ServiceResource>> GetResources(List<Right> rights, CancellationToken cancellationToken = default)
    {
        List<ServiceResource> resources = [];

        foreach (Right right in rights)
        {
            string? resourceId = right.Resource.Find(x => x.Id == "urn:altinn:resource")?.Value;
            
            if (resourceId != null)
            {
                ServiceResource? serviceResource = await GetResource(resourceId, cancellationToken);
                if (serviceResource != null) 
                {
                    resources.Add(serviceResource);
                }
            }
        }

        return resources;
    }

    private async Task<ServiceResource?> GetResource(string resourceId, CancellationToken cancellationToken = default)
    {
        try
        {
            string endpointUrl = $"resource/{resourceId}";

            HttpResponseMessage response = await _httpClient.GetAsync(endpointUrl, cancellationToken);
            if (response.StatusCode == System.Net.HttpStatusCode.OK) 
            {
                return await response.Content.ReadFromJsonAsync<ServiceResource>(_jsonSerializerOptions, cancellationToken);
            }
            else 
            {
                return null;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Authentication.UI // ResourceRegistry // GetResource ({resourceId}) // Exception");
            throw;
        }
    }
}
