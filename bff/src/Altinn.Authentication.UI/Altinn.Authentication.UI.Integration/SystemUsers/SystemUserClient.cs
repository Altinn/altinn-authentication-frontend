﻿using Altinn.Authentication.UI.Core.Authentication;
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
        ILogger logger, 
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

    public async Task<SystemUserReal?> GetSpecificSystemUserReal(int partyId, Guid id, CancellationToken cancellationToken = default)
    {
        string token = JwtTokenUtil.GetTokenFromContext(_httpContextAccessor.HttpContext!, _platformSettings.JwtCookieName!)!;
        string endpointUrl = $"authentication/api/v1/systemuser/{partyId}/{id}";

        HttpResponseMessage response = await _httpClient.GetAsync(token, endpointUrl);

        if (response.IsSuccessStatusCode)
        {
            return JsonSerializer.Deserialize<SystemUserReal>(await response.Content.ReadAsStringAsync(cancellationToken))!;
        }

        return null;
    }

    public async Task<SystemUserReal?> PostNewSystemUserReal(SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellation = default)
    {
        string token = JwtTokenUtil.GetTokenFromContext(_httpContextAccessor.HttpContext!, _platformSettings.JwtCookieName!)!;
        string endpointUrl = $"authentication/api/v1/suystemuser";
        //var accessToken = await _accessTokenProvider.GetAccessToken();

        var requestObject = new
        { 
            PartyId = newSystemUserDescriptor.OwnedByPartyId!,
            IntegrationTitle = newSystemUserDescriptor.IntegrationTitle!,
            ProductName = newSystemUserDescriptor.SelectedSystemType!            
        };

        StringContent content = new(JsonSerializer.Serialize(requestObject));
        HttpResponseMessage response = await _httpClient.PostAsync(token, endpointUrl, content);

        if (response.IsSuccessStatusCode)
        {
            return JsonSerializer.Deserialize<SystemUserReal>(await response.Content.ReadAsStringAsync(cancellation))!;
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

    public async Task<List<SystemUserReal>> GetSystemUserRealsForChosenUser(int id, CancellationToken cancellationToken = default)
    {
        List<SystemUserReal> list = [];

        HttpRequestMessage request = new(HttpMethod.Get, $"authentication/api/v1/systemuser/{id}");
        HttpResponseMessage response = await _httpClient.SendAsync(request, HttpCompletionOption.ResponseContentRead, cancellationToken);

        if (response.IsSuccessStatusCode)
        {
            list = JsonSerializer.Deserialize<List<SystemUserReal>>(await response.Content.ReadAsStringAsync(cancellationToken))!;
        }

        return list;
    }



    public Task<bool> ChangeSystemUserRealProduct(string selectedSystemType, Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
