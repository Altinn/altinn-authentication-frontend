using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Integration.AccessToken;
using Altinn.Authentication.UI.Integration.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Altinn.Authentication.UI.Core.Extensions;
using System.Text.Json;
using System.Net.Http.Json;
using Altinn.Authorization.ProblemDetails;
using Altinn.Authentication.UI.Core.Common.Problems;

namespace Altinn.Authentication.UI.Integration.SystemUsers;

public class SystemUserClient : ISystemUserClient
{
    private readonly ILogger _logger;
    private readonly HttpClient _httpClient;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly PlatformSettings _platformSettings;
    private readonly IAccessTokenProvider _accessTokenProvider;

    public SystemUserClient(
        ILogger<SystemUserClient> logger, 
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

    public async Task<SystemUser?> GetSpecificSystemUserReal(int partyId, Guid id, CancellationToken cancellationToken = default)
    {
        string token = JwtTokenUtil.GetTokenFromContext(_httpContextAccessor.HttpContext!, _platformSettings.JwtCookieName!)!;
        string endpointUrl = $"systemuser/{partyId}/{id}";

        HttpResponseMessage response = await _httpClient.GetAsync(token, endpointUrl);

        if (response.IsSuccessStatusCode)
        {
            return JsonSerializer.Deserialize<SystemUser>(await response.Content.ReadAsStringAsync(cancellationToken))!;
        }

        return null;
    }

    public async Task<Result<SystemUser>> CreateSystemUser(
        int partyId,
        SystemUserRequestDto newSystemUser,
        CancellationToken cancellation = default)
    {

        string token = JwtTokenUtil.GetTokenFromContext(_httpContextAccessor.HttpContext!, _platformSettings.JwtCookieName!)!;
        string endpointUrl = $"systemuser/{partyId}/create";

        var content = JsonContent.Create(newSystemUser);
        HttpResponseMessage response = await _httpClient.PostAsync(token, endpointUrl, content);
       
        if (response.IsSuccessStatusCode) 
        {
            return await response.Content.ReadFromJsonAsync<SystemUser>(cancellation);
        }
        
        try
        {
            AltinnProblemDetails? problemDetails = await response.Content.ReadFromJsonAsync<AltinnProblemDetails>(cancellation);
            return ProblemMapper.MapToAuthUiError(problemDetails?.ErrorCode.ToString());
        }
        catch 
        {
            return Problem.Generic_EndOfMethod;
        }
    }

    public async Task<Result<bool>> DeleteSystemUserReal(int partyId, Guid id, CancellationToken cancellationToken = default)
    {
        string token = JwtTokenUtil.GetTokenFromContext(_httpContextAccessor.HttpContext!, _platformSettings.JwtCookieName!)!;
        string endpointUrl = $"systemuser/{partyId}/{id}";
        HttpResponseMessage response = await _httpClient.DeleteAsync(token, endpointUrl);
        if (response.IsSuccessStatusCode)
        {
            return true;
        }
        return Problem.Generic_EndOfMethod;
    }

    public Task<bool> ChangeSystemUserRealTitle(string newTitle, Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<bool> ChangeSystemUserRealDescription(string newDescr, Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public async Task<List<SystemUser>> GetSystemUserRealsForChosenUser(int id, CancellationToken cancellationToken = default)
    {
        string token = JwtTokenUtil.GetTokenFromContext(_httpContextAccessor.HttpContext!, _platformSettings.JwtCookieName!)!;
        string endpointUrl = $"systemuser/{id}";

        List<SystemUser> list = [];

        HttpResponseMessage response = await _httpClient.GetAsync(token, endpointUrl);

        if (response.IsSuccessStatusCode)
        {
            list = JsonSerializer.Deserialize<List<SystemUser>>(await response.Content.ReadAsStringAsync(cancellationToken))!;
        }

        return list;
    }
}
