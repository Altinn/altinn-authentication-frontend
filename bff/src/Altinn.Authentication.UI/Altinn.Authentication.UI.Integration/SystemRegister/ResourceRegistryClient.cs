using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Authentication.UI.Integration.Configuration;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;

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

    public async Task<ServiceResource?> GetResource(string resourceId, CancellationToken cancellationToken = default)
    {
        try
        {
            string endpointUrl = $"resource/{resourceId}";

            HttpResponseMessage response = await _httpClient.GetAsync(endpointUrl, cancellationToken);

            return await response.Content.ReadFromJsonAsync<ServiceResource>(_jsonSerializerOptions, cancellationToken);

        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Authentication.UI // ResourceRegistry // GetResource ({resourceId}) // Exception");
            throw;
        }
    }
}
