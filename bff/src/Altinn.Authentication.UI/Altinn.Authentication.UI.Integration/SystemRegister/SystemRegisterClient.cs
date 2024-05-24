using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Authentication.UI.Integration.AccessToken;
using Altinn.Authentication.UI.Integration.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Altinn.Authentication.UI.Core.Extensions;
using System.Text.Json;
using Microsoft.Extensions.Options;

namespace Altinn.Authentication.UI.Integration.SystemRegister;

public class SystemRegisterClient : ISystemRegisterClient
{
    private readonly ILogger _logger;
    private readonly HttpClient _httpClient;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly PlatformSettings _platformSettings;
    private readonly IAccessTokenProvider _accessTokenProvider;

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
        string endpointUrl = $"authentication/api/v1/systemregister";
        
        HttpResponseMessage response = await _httpClient.GetAsync(token, endpointUrl);

        if(response.IsSuccessStatusCode)
        {
            return JsonSerializer.Deserialize<List<RegisteredSystemDTO>>(await response.Content.ReadAsStringAsync(cancellationToken))!;
        }
        return [];
    }
}
