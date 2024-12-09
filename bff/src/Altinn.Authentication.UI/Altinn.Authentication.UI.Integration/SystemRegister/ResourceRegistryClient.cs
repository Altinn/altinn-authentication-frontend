using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Authentication.UI.Integration.Configuration;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;
using Altinn.Authentication.UI.Core.Common.Rights;
using Microsoft.Extensions.Caching.Memory;
using Altinn.Authentication.UI.Core.AppConfiguration;

namespace Altinn.Authentication.UI.Integration.SystemRegister;

public class ResourceRegistryClient : IResourceRegistryClient
{
    private readonly ILogger _logger;
    private readonly HttpClient _httpClient;
    private readonly PlatformSettings _platformSettings;
    private readonly IMemoryCache _memoryCache;
    private readonly CacheConfig _cacheConfig;
    private readonly JsonSerializerOptions _jsonSerializerOptions = new() { PropertyNameCaseInsensitive = true };

    public ResourceRegistryClient(
        ILogger<SystemRegisterClient> logger,
        HttpClient httpClient,
        IOptions<PlatformSettings> platformSettings,
        IMemoryCache memoryCache,
        IOptions<CacheConfig> cacheConfig)
    {
        _logger = logger;
        _platformSettings = platformSettings.Value;
        httpClient.BaseAddress = new Uri(_platformSettings!.ResourceRegistryEndpoint);
        _httpClient = httpClient;
        _memoryCache = memoryCache;
        _cacheConfig = cacheConfig.Value;
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
                ServiceResource? resource = await response.Content.ReadFromJsonAsync<ServiceResource>(_jsonSerializerOptions, cancellationToken);
                if (resource?.HasCompetentAuthority?.Orgcode != null) 
                {
                    string? logoUrl = await GetOrgIconUrl(resource.HasCompetentAuthority.Orgcode, cancellationToken);
                    resource.LogoUrl = logoUrl;
                }
                return resource;
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

    private async Task<string?> GetOrgIconUrl(string org, CancellationToken cancellationToken)
    {
        OrgList? orgList = await GetAllResourceOwners(cancellationToken);
        if (orgList != null && orgList.Orgs.TryGetValue(org, out Org? organization))
        {
            return organization.Logo;
        }
        
        return null;
    }

    private async Task<OrgList?> GetAllResourceOwners(CancellationToken cancellationToken)
    {
        string endpointUrl = "resource/orgs";
        string cacheKey = "all_resource_owners";
        if (!_memoryCache.TryGetValue(cacheKey, out OrgList? resourceOwners))
        {
            try
            {
                HttpResponseMessage response = await _httpClient.GetAsync(endpointUrl, cancellationToken);
                resourceOwners = await response.Content.ReadFromJsonAsync<OrgList>(_jsonSerializerOptions, cancellationToken);
                MemoryCacheEntryOptions cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetPriority(CacheItemPriority.High)
                    .SetAbsoluteExpiration(new TimeSpan(0, _cacheConfig.ResourceOwnerCacheTimeout, 0));

                _memoryCache.Set(cacheKey, resourceOwners, cacheEntryOptions);
                return resourceOwners;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Authentication.UI // ResourceClient // GetAllResourceOwners // Exception");
                throw;
            }
        }

        return resourceOwners;
    }
}
