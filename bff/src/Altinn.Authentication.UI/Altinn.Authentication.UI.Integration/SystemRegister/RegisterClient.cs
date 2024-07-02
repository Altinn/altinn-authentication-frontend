using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Authentication.UI.Integration.AccessToken;
using Altinn.Authentication.UI.Integration.Configuration;
using Altinn.Platform.Register.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Altinn.Authentication.UI.Core.Extensions;

namespace Altinn.Authentication.UI.Integration.SystemRegister;


public class RegisterClient : IRegisterClient
{
    private readonly ILogger _logger;
    private readonly HttpClient _httpClient;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly PlatformSettings _platformSettings;
    private readonly IAccessTokenProvider _accessTokenProvider;
    private readonly JsonSerializerOptions _jsonSerializerOptions = new() { PropertyNameCaseInsensitive = true };

    /// <summary>
    /// Initializes a new instance of the <see cref="RegisterClient"/> class
    /// </summary>
    /// <param name="httpClient">http client</param>
    /// <param name="logger">the handler for logger service</param>
    /// <param name="httpContextAccessor">the handler for httpcontextaccessor service</param>
    /// <param name="platformSettings"> platform settings configuration</param>
    /// <param name="accessTokenProvider">the handler for access token generator</param>

    public RegisterClient(
        HttpClient httpClient,
        ILogger<RegisterClient> logger,
        IHttpContextAccessor httpContextAccessor,
        IOptions<PlatformSettings> platformSettings,
        IAccessTokenProvider accessTokenProvider)
    {
        _logger = logger;
        _platformSettings = platformSettings.Value;
        _accessTokenProvider = accessTokenProvider;
        httpClient.BaseAddress = new Uri(_platformSettings.ApiRegisterEndpoint);
        httpClient.DefaultRequestHeaders.Add(_platformSettings.SubscriptionKeyHeaderName, _platformSettings.SubscriptionKey);
        _httpClient = httpClient;
        _httpContextAccessor = httpContextAccessor;
        _accessTokenProvider = accessTokenProvider;
        _jsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    }

    /// <inheritdoc/>
    public async Task<Party> GetPartyForOrganization(string organizationNumber)
    {
        try
        {
            string endpointUrl = $"parties/lookup";
            string token = JwtTokenUtil.GetTokenFromContext(_httpContextAccessor.HttpContext!, _platformSettings.JwtCookieName!)!;
            var accessToken = await _accessTokenProvider.GetAccessToken();

            StringContent requestContent = new(JsonSerializer.Serialize(new PartyLookup { OrgNo = organizationNumber}, _jsonSerializerOptions), Encoding.UTF8, "application/json");

            HttpResponseMessage response = await _httpClient.PostAsync(token, endpointUrl, requestContent, accessToken);
            string responseContent = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return JsonSerializer.Deserialize<Party>(responseContent, _jsonSerializerOptions)!;
            }

            return null!;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Authentication.UI // RegisterClient // GetPartyForOrganization // Exception");
            throw;
        }
    }
}
