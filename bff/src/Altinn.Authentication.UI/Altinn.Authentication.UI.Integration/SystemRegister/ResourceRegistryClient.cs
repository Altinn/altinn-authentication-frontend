using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Authentication.UI.Integration.Configuration;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;
using Microsoft.Extensions.Caching.Memory;
using Altinn.Authentication.UI.Core.AppConfiguration;
using System.Text;
using Altinn.Authentication.UI.Core.Common.Rights;

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

    public async Task<FullRights> GetResourcesForRights(IEnumerable<Right> rights, IEnumerable<AccessPackage> accessPackages, CancellationToken cancellationToken)
    {
        IEnumerable<string> resourceIds = rights.SelectMany(x => x.Resource.Where(z => z.Id == "urn:altinn:resource").Select(y => y.Value));
        List<ServiceResource> resources = await GetResourcesByIds(resourceIds, cancellationToken);

        List<AccessPackage> accessPackagesWithResources = await GetAccessPackageResources(accessPackages, cancellationToken);

        return new FullRights()
        {
            Resources = resources,
            AccessPackages = accessPackagesWithResources
        };
    }

    private async Task<List<AccessPackage>> GetAccessPackageResources(IEnumerable<AccessPackage> accessPackages, CancellationToken cancellationToken)
    {
        List<AccessPackage> accessPackagesWithResources = [];
        
        // get AccessPackage <-> resource connection
        IEnumerable<string> subjects = accessPackages.Select(accessPackage => accessPackage.Urn);
        IEnumerable<SubjectResources> subjectResources = await GetSubjectResources(subjects.ToList(), cancellationToken);

        // map resources for each access package
        foreach (AccessPackage accessPackage in accessPackages)
        {
            IEnumerable<AttributeMatchV2>? resourceMatches = subjectResources.First(x => x.Subject.Urn == accessPackage.Urn)?.Resources;
            IEnumerable<string> resourceIds = resourceMatches?.Select(x => x.Value) ?? [];
            
            // get all resources for access package (this also included LogoUrl):
            List<ServiceResource> resources = await GetResourcesByIds(resourceIds, cancellationToken);
            accessPackage.Resources = resources;
            accessPackagesWithResources.Add(accessPackage);
        }

        return accessPackagesWithResources;
    }

    private async Task<List<ServiceResource>> GetResourcesByIds(IEnumerable<string> resourceIds, CancellationToken cancellationToken = default)
    {
        List<ServiceResource> resources = [];

        foreach (string resourceId in resourceIds)
        {
            ServiceResource? serviceResource = await GetResource(resourceId, cancellationToken);
            if (serviceResource != null) 
            {
                resources.Add(serviceResource);
            }
        }

        return resources;
    }

    // TODO: load full list of resources instead and lookup by id? Will it be faster? 
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
                    resource.LogoUrl = await GetOrgIconUrl(resource.HasCompetentAuthority.Orgcode, cancellationToken);
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
        if (orgList != null)
        {
            if (orgList.Orgs.TryGetValue(org, out Org? organization))
            {
                return organization.Logo;
            }
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

    private async Task<IEnumerable<SubjectResources>> GetSubjectResources(IEnumerable<string> subjects, CancellationToken cancellationToken)
    {
        string url = $"resource/bysubjects";

        string serializedContent = JsonSerializer.Serialize(subjects, _jsonSerializerOptions);
        using HttpRequestMessage getSubjectResourcesRequest = new HttpRequestMessage()
        {
            RequestUri = new Uri(url),
            Method = HttpMethod.Post,
            Content = new StringContent(serializedContent, Encoding.UTF8, "application/json"),
        };
        using HttpResponseMessage response = await _httpClient.SendAsync(getSubjectResourcesRequest, cancellationToken);
        response.EnsureSuccessStatusCode();

        SubjectResourcesDto? responseContent = await response.Content.ReadFromJsonAsync<SubjectResourcesDto>(_jsonSerializerOptions, cancellationToken);
        return responseContent?.Data ?? [];
    }
}
