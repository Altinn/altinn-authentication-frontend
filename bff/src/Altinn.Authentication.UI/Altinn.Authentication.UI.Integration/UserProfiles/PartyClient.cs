using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Authentication.UI.Integration.Configuration;
using Altinn.Authentication.UI.Core.Extensions;
using Altinn.Platform.Register.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using System.Text.Json.Serialization;
using Altinn.Authentication.UI.Core.Common.Models;

namespace Altinn.Authentication.UI.Integration.UserProfiles;

/// <summary>
/// Proxy implementation for parties
/// </summary>
[ExcludeFromCodeCoverage]
public class PartyClient : IPartyClient
{
    private readonly ILogger _logger;
    private readonly HttpClient _client;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly PlatformSettings _platformSettings;
    private readonly JsonSerializerOptions _serializerOptions =
        new() { PropertyNameCaseInsensitive = true };

    /// <summary>
    /// Initializes a new instance of the <see cref="LookupClient"/> class
    /// </summary>
    /// <param name="httpClient">HttpClient from default httpclientfactory</param>
    /// <param name="logger">the logger</param>
    /// <param name="httpContextAccessor">handler for http context</param>
    /// <param name="platformSettings">the platform setttings</param>
    public PartyClient(
        HttpClient httpClient,
        ILogger<PartyClient> logger,
        IHttpContextAccessor httpContextAccessor,
        IOptions<PlatformSettings> platformSettings)
    {
        _logger = logger;
        _httpContextAccessor = httpContextAccessor;
        _platformSettings = platformSettings.Value;
        httpClient.BaseAddress = new Uri(_platformSettings.ApiAccessManagementEndpoint);
        _client = httpClient;
        _serializerOptions.Converters.Add(new JsonStringEnumConverter());
    }

    /// <inheritdoc/>
    public async Task<AuthorizedPartyExternal> GetPartyFromReporteeListIfExists(int partyId)
    {
        try
        {
            string endpointUrl = $"authorizedparty/{partyId}?includeAltinn2=true";
            string token = JwtTokenUtil.GetTokenFromContext(_httpContextAccessor.HttpContext!, _platformSettings.JwtCookieName!)!;

            HttpResponseMessage response = await _client.GetAsync(token, endpointUrl);

            if ( response.StatusCode == System.Net.HttpStatusCode.OK )
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<AuthorizedPartyExternal>(responseContent, _serializerOptions)!;
            }

            return null!;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Authentication.UI // PartyClient // GetPartyFromReporteeListIfExists // Exception");
            throw;
        }
    }

    /// <inheritdoc/>
    public async Task<PartyExternal> GetParty(int partyId)
    {
        try
        {
            string endpointUrl = $"authorizedparty/{partyId}?includeAltinn2=true";
            string token = JwtTokenUtil.GetTokenFromContext(_httpContextAccessor.HttpContext!, _platformSettings.JwtCookieName!)!;

            HttpResponseMessage response = await _client.GetAsync(token, endpointUrl);

            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<PartyExternal>(responseContent, _serializerOptions)!;
            }

            return null!;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Authentication.UI // PartyClient // GetPartyFromReporteeListIfExists // Exception");
            throw;
        }
    }
}
