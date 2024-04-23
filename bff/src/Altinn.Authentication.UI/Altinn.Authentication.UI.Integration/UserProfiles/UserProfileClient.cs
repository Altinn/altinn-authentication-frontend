using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Authentication.UI.Integration.Configuration;
using Altinn.Platform.Profile.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.Json.Serialization;
using Altinn.Authentication.UI.Core.Extensions;
using Altinn.Authentication.UI.Integration.AccessToken;

namespace Altinn.Authentication.UI.Integration.UserProfiles;

/// <summary>
/// Integration client towards the Profile API in Platform
/// </summary>
public class UserProfileClient : IUserProfileClient
{
    private readonly ILogger _logger;
    private readonly HttpClient _httpClient;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly PlatformSettings _platformSettings;
    private readonly IAccessTokenProvider _accessTokenProvider;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="logger"></param>
    /// <param name="httpClient"></param>
    /// <param name="httpContextAccessor"></param>
    /// <param name="platformSettings"></param>
    /// <param name="accessTokenProvider"></param>
    public UserProfileClient(
        ILogger logger, 
        HttpClient httpClient, 
        IHttpContextAccessor httpContextAccessor, 
        PlatformSettings platformSettings, 
        IAccessTokenProvider accessTokenProvider)
    {
        _logger = logger;
        _httpClient = httpClient;
        _httpContextAccessor = httpContextAccessor;
        _platformSettings = platformSettings;
        _accessTokenProvider = accessTokenProvider;
    }

    /// <inheritdoc/>
    public async Task<UserProfile> GetUserProfile(int userid)
    {
        UserProfile user;
        try
        {
            string endpoint = $"users/{userid}";
            user = await GetUserProfileFromEndpoint(endpoint);            
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Authentication.UI // ProfileClient // GetUserProfile // Exception");
            throw;
        }

        return user!;
    }

    private async Task<UserProfile> GetUserProfileFromEndpoint(string endpoint)
    {
        string token = JwtTokenUtil.GetTokenFromContext(_httpContextAccessor.HttpContext!, _platformSettings.JwtCookieName!)!;
        var accessToken = await _accessTokenProvider.GetAccessToken();

        HttpResponseMessage response = await _httpClient.GetAsync(token, endpoint, accessToken ); 

        if(response.StatusCode == System.Net.HttpStatusCode.OK) 
        {
            string responseContent = await response.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
            };
            options.Converters.Add(new JsonStringEnumConverter());
            UserProfile userProfile = JsonSerializer.Deserialize<UserProfile>(responseContent, options)!;
            return userProfile;
        }
        else
        {
            _logger.LogError($"Getting user profile information from platform failed with statuscode {response.StatusCode}");
            return null!;
        }

    }
}
