using Altinn.Authentication.UI.Core.SystemUsers;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;

namespace Altinn.Authentication.UI.Integration.SystemUsers;

public class SystemUserClient : ISystemUserClient
{
    private readonly HttpClient _httpClient;

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

    public SystemUserClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }
   
    public async Task<SystemUserReal?> GetSpecificSystemUserReal(int partyId, Guid id, CancellationToken cancellationToken = default)
    {
        HttpRequestMessage request = new(HttpMethod.Get, $"authentication/api/v1/systemuser/{partyId}/{id}");
        HttpResponseMessage response = await _httpClient.SendAsync(request, HttpCompletionOption.ResponseContentRead, cancellationToken);

        if (response.IsSuccessStatusCode)
        {
            return JsonSerializer.Deserialize<SystemUserReal>(await response.Content.ReadAsStringAsync(cancellationToken))!;
        }

        return null;
    }

    public async Task<SystemUserReal?> PostNewSystemUserReal(SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellation = default)
    {
        var requestObject = new
        { 
            PartyId = newSystemUserDescriptor.OwnedByPartyId!,
            IntegrationTitle = newSystemUserDescriptor.IntegrationTitle!,
            ProductName = newSystemUserDescriptor.SelectedSystemType!
        };

        HttpRequestMessage request = new(HttpMethod.Post, $"authentication/api/v1/systemuser")
        {
            Content = JsonContent.Create(requestObject, new MediaTypeHeaderValue("application/json"))
        };

        HttpResponseMessage response = await _httpClient.SendAsync(request, HttpCompletionOption.ResponseContentRead, cancellation);

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
