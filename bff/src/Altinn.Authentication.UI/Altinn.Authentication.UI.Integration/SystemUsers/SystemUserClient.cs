using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Integration.AccessToken;
using Altinn.Authentication.UI.Integration.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Altinn.Authentication.UI.Core.Extensions;
using System.Text.Json;

namespace Altinn.Authentication.UI.Integration.SystemUsers;

public class SystemUserClient : ISystemUserClient
{
    private readonly ILogger _logger;
    private readonly HttpClient _httpClient;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly PlatformSettings _platformSettings;
    private readonly IAccessTokenProvider _accessTokenProvider;

    private static SystemUserReal MapDescriptorToSystemUserReal(SystemUserDescriptor sysdescr)
    {
        return new SystemUserReal()
        {
            Id = Guid.NewGuid().ToString(),
            ClientId = Guid.NewGuid().ToString(), 
            SystemType = sysdescr.SelectedSystemType,
            Title = sysdescr.IntegrationTitle,
            Created = DateTime.UtcNow.Date.ToString()

        };       
    }

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

    public async Task<SystemUser?> PostNewSystemUserReal(
        int partyId,
        SystemUserDescriptor newSystemUserDescriptor, 
        CancellationToken cancellation = default)
    {
        if(partyId.ToString() != newSystemUserDescriptor.OwnedByPartyId) { return null; }

        string token = JwtTokenUtil.GetTokenFromContext(_httpContextAccessor.HttpContext!, _platformSettings.JwtCookieName!)!;
        string endpointUrl = $"systemuser/{partyId}";
        var accessToken = await _accessTokenProvider.GetAccessToken();
        var requestObject = new
        { 
            PartyId = partyId,
            IntegrationTitle = newSystemUserDescriptor.IntegrationTitle!,
            ProductName = newSystemUserDescriptor.SelectedSystemType!            
        };
        StringContent content = new(JsonSerializer.Serialize(requestObject), new System.Net.Http.Headers.MediaTypeHeaderValue("application/json")) ;
        HttpResponseMessage response = await _httpClient.PostAsync(token, endpointUrl, content, accessToken);

        if (response.IsSuccessStatusCode)
        {
            return JsonSerializer.Deserialize<SystemUser>(await response.Content.ReadAsStringAsync(cancellation))!;
        }

        return null;
    }

    public async Task<bool> DeleteSystemUserReal(Guid id, CancellationToken cancellationToken = default)
    {
        //    SystemUserReal? toDelete = _systemUserList.Find(i => i.Id == id.ToString());        
        //    if (toDelete is null) return false;
        //    _systemUserList.Remove(toDelete);
        //    return true;
        throw new NotImplementedException();
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

    public Task<bool> ChangeSystemUserRealProduct(string selectedSystemType, Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
