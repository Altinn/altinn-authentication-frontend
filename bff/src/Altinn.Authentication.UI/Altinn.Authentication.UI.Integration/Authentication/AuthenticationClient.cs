using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Integration.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;

namespace Altinn.Authentication.UI.Integration.Authentication;

public class AuthenticationClient : IAuthenticationClient
{
    private readonly ILogger _logger;    
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly HttpClient _client;
    private readonly PlatformSettings _platformSettings;

    public AuthenticationClient(ILogger logger, 
        IHttpContextAccessor httpContextAccessor, 
        HttpClient client, 
        IOptions<PlatformSettings> platformSettings)
    {
        _logger = logger;
        _platformSettings = platformSettings.Value;
        _httpContextAccessor = httpContextAccessor;
        client.BaseAddress = new Uri(platformSettings.Value.ApiAuthenticationEndpoint!);
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        _client = client;
        
    }

    public async Task<string> RefreshToken()
    {
        const string prefix = "AuthenticationUI // AuthenticationClient // Refresh // Exception //";
        try
        {
            string endpointUrl = $"refresh";
            HttpContext? httpContext = _httpContextAccessor.HttpContext ?? throw new Exception(prefix + " Failed to get the HttpContext");
            string? jwtCookieName = _platformSettings.JwtCookieName ?? throw new Exception(prefix + " Failed to get the JwtCookieName from the platformsettings.");
            string? token = JwtTokenUtil.GetTokenFromContext(httpContext, jwtCookieName) ?? throw new Exception(prefix + " Failed to get the JwtToken from the Context.");
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            HttpResponseMessage response = await _client.GetAsync(endpointUrl);

            if(response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                string refreshedToken = await response.Content.ReadAsStringAsync();
                refreshedToken = refreshedToken.Replace('"', ' ').Trim();
            }
            else
            {
                _logger.LogError("Refreshing JwtToken failed with status code", response.StatusCode);
            }

        }       

        catch (Exception e)
        {
            _logger.LogError(e, prefix);
        }

        return null;
    }

}
