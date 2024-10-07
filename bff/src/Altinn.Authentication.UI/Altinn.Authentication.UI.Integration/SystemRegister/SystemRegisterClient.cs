using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Authentication.UI.Integration.AccessToken;
using Altinn.Authentication.UI.Integration.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Altinn.Authentication.UI.Core.Extensions;
using System.Text.Json;
using Microsoft.Extensions.Options;
using Altinn.Authentication.UI.Core.Common.Rights;

namespace Altinn.Authentication.UI.Integration.SystemRegister;

public class SystemRegisterClient : ISystemRegisterClient
{
    private readonly ILogger _logger;
    private readonly HttpClient _httpClient;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly PlatformSettings _platformSettings;
    private readonly IAccessTokenProvider _accessTokenProvider;
    private readonly JsonSerializerOptions _jsonSerializerOptions = new() { PropertyNameCaseInsensitive = true};

    public SystemRegisterClient(
        ILogger<SystemRegisterClient> logger, 
        HttpClient httpClient, 
        IHttpContextAccessor httpContextAccessor, 
        IOptions<PlatformSettings> platformSettings, 
        IAccessTokenProvider accessTokenProvider)
    {
        _logger = logger;
        _httpContextAccessor = httpContextAccessor;
        _platformSettings = platformSettings.Value;
        _accessTokenProvider = accessTokenProvider;
        httpClient.BaseAddress = new Uri(_platformSettings!.ApiAuthenticationEndpoint!);
        httpClient.DefaultRequestHeaders.Add(_platformSettings.SubscriptionKeyHeaderName, _platformSettings.SubscriptionKey);
        _httpClient = httpClient;
    }

    public async Task<List<RegisteredSystemDTO>> GetListRegSys(CancellationToken cancellationToken = default)
    {
        string token = JwtTokenUtil.GetTokenFromContext(_httpContextAccessor.HttpContext!, _platformSettings.JwtCookieName!)!;
        string endpointUrl = $"systemregister";
        var accessToken = await _accessTokenProvider.GetAccessToken();

        HttpResponseMessage response = await _httpClient.GetAsync(token, endpointUrl, accessToken);

        if (response.IsSuccessStatusCode)
        {
            return JsonSerializer.Deserialize<List<RegisteredSystemDTO>>
                (await response.Content.ReadAsStringAsync(cancellationToken), _jsonSerializerOptions)!;
        }
        return [];
    }

    public async Task<RegisteredSystemDTO?> GetSystem(string systemId, CancellationToken cancellationToken = default)
    {
        string token = JwtTokenUtil.GetTokenFromContext(_httpContextAccessor.HttpContext!, _platformSettings.JwtCookieName!)!;
        string endpointUrl = $"systemregister/{systemId}";
        var accessToken = await _accessTokenProvider.GetAccessToken();

        HttpResponseMessage response = await _httpClient.GetAsync(token, endpointUrl, accessToken);

        if (response.IsSuccessStatusCode)
        {
            return JsonSerializer.Deserialize<RegisteredSystemDTO>(await response.Content.ReadAsStringAsync(cancellationToken), _jsonSerializerOptions)!;   
        }
        return null;
    }


    public async Task<List<Right>> GetRightFromSystem(string systemId, CancellationToken cancellationToken)
    {
        string token = JwtTokenUtil.GetTokenFromContext(_httpContextAccessor.HttpContext!, _platformSettings.JwtCookieName!)!;
        string endpointUrl = $"systemregister/system/{systemId}/rights";
        var accessToken = await _accessTokenProvider.GetAccessToken();

        HttpResponseMessage response = await _httpClient.GetAsync(token, endpointUrl, accessToken);

        if (response.IsSuccessStatusCode)
        {
            return JsonSerializer.Deserialize<List<Right>>
                (await response.Content.ReadAsStringAsync(cancellationToken), _jsonSerializerOptions)!;
        }
        return [];
    }
}
