using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Authentication.UI.Integration.Configuration;
using Altinn.Authentication.UI.Core.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using System.Text.Json.Serialization;
using Altinn.Authentication.UI.Core.Common.Models;
using System.Text;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Platform.Register.Models;
using Azure.Core;
using System.IO;
using Altinn.Authentication.UI.Core.Common.Rights;
using System.Net.Http.Json;
using Altinn.Authorization.ProblemDetails;
using Altinn.Authentication.UI.Core.Common.Problems;

namespace Altinn.Authentication.UI.Integration.UserProfiles;

/// <summary>
/// Proxy implementation for parties
/// </summary>
[ExcludeFromCodeCoverage]
public class AccessManagementClient : IAccessManagementClient
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
    public AccessManagementClient(
        HttpClient httpClient,
        ILogger<AccessManagementClient> logger,
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
    public async Task<AuthorizedPartyExternal?> GetPartyFromReporteeListIfExists(int partyId)
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

            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Authentication.UI // AccessManagementClient // GetPartyFromReporteeListIfExists // Exception");
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
            _logger.LogError(ex, "Authentication.UI // AccessManagementClient // GetPartyFromReporteeListIfExists // Exception");
            throw;
        }
    }

    /// <inheritdoc />
    public async Task<List<DelegationResponseData>?> CheckDelegationAccess(string partyId, DelegationCheckRequest request)
    {
        try
        {
            string endpointUrl = $"internal/{partyId}/rights/delegation/delegationcheck";
            string token = JwtTokenUtil.GetTokenFromContext(_httpContextAccessor.HttpContext!, _platformSettings.JwtCookieName!)!;
            string content = JsonSerializer.Serialize(request, _serializerOptions);
            StringContent requestBody = new(content, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _client.PostAsync(token, endpointUrl, requestBody);
            response.EnsureSuccessStatusCode();
            return JsonSerializer.Deserialize<List<DelegationResponseData>>( await response.Content.ReadAsStringAsync(), _serializerOptions) ;

        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Authentication.UI // AccessManagementClient // CheckDelegationAccess // Exception");
            throw;
        }
    }

    /// <inheritdoc />
    public async Task<Result<bool>> DelegateRightToSystemUser(string partyId, SystemUser systemUser, List<RightResponses> responseData)
    {

        foreach (RightResponses rightResponse in responseData)
        {
            if (! await DelegateSingleRightToSystemUser(partyId, systemUser, rightResponse) )
            {
                return Problem.Rights_FailedToDelegate;
            };
        }

        return true;
    }

    private async Task<bool> DelegateSingleRightToSystemUser(string partyId, SystemUser systemUser, RightResponses rightResponses)
    {
        List<Right> rights = [];

        foreach (DelegationResponseData inner in rightResponses.ResponseDataSet)
        {
            Right right = new()
            {
                Action = inner.Action,
                Resource = inner.Resource,
            };

            rights.Add(right);
        }

        DelegationRequest rightsDelegationRequest = new()
        {
            To =
            [
                new AttributePair()
                {
                    Id = "urn:altinn:systemuser:uuid",
                    Value = systemUser.Id
                }
            ],

            Rights = rights
        };

        try
        {
            string endpointUrl = $"internal/{partyId}/rights/delegation/offered";
            string token = JwtTokenUtil.GetTokenFromContext(_httpContextAccessor.HttpContext!, _platformSettings.JwtCookieName!)!;
            HttpResponseMessage response = await _client.PostAsync(token, endpointUrl, JsonContent.Create(rightsDelegationRequest));

            response.EnsureSuccessStatusCode();

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Authentication.UI // AccessManagementClient // DelegateSingleRightToSystemUser // Exception");
            throw;
        }

    }
}
