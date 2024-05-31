using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Core.UserProfiles;

namespace Altinn.Authentication.UI.Mocks.SystemUsers;

public class SystemUserClientMock : ISystemUserClient
{
    private static List<SystemUserReal> MockTestHelper()
    {
        //Mock Data
        SystemUserReal systemUser1 = new()
        {
            Id = "37ce1792-3b35-4d50-a07d-636017aa7dbd",
            Title = "Vårt regnskapsystem",
            Description = "Koblet opp mot Visma. Snakk med Pål om abonnement",
            SystemType = "visma_vis_v2",
            OwnedByPartyId = "orgno:91235123",
            Created = "2023-09-12",
            IsDeleted = false,
            ClientId = ""
        };

        SystemUserReal systemUser2 = new()
        {
            Id = "37ce1792-3b35-4d50-a07d-636017aa7dbe",
            Title = "Vårt andre regnskapsystem",
            Description = "Snakk med Per om abonnement",
            SystemType = "visma_vis_sys",
            OwnedByPartyId = "orgno:91235124",
            Created = "2023-09-22",
            IsDeleted = false,
            ClientId = ""
        };

        SystemUserReal systemUser3 = new()
        {
            Id = "37ce1792-3b35-4d50-a07d-636017aa7dbf",
            Title = "Et helt annet system",
            Description = "Kai og Guri vet alt om dette systemet.",
            SystemType = "fiken_superskatt",
            OwnedByPartyId = "orgno:91235125",
            Created = "2023-09-22",
            IsDeleted = false,
            ClientId = ""
        };

    List<SystemUserReal> systemUserList = new()
        {
            systemUser1,
            systemUser2,
            systemUser3
        };
        return systemUserList;
    }

    private List<SystemUser> MockTestHelperNew()
    {
        return [];
    }

    private readonly HttpClient _httpClient;
    private readonly IPartyClient _partyClient;
    private static List<SystemUser> _systemUserList = [];

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

    public SystemUserClientMock(HttpClient httpClient, IPartyClient partyClient)
    {
        _partyClient = partyClient;
        _httpClient = httpClient;
        _systemUserList = MockTestHelperNew();
    }
   
    public async Task<SystemUser?> GetSpecificSystemUserReal(int partyId, Guid id, CancellationToken cancellationToken = default)
    {
        await Task.Delay(50);
        return _systemUserList.Find(i => i.Id == id.ToString());
    }

    public async Task<SystemUser> PostNewSystemUserReal(string partyOrgNo, SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellation = default)
    {
        await Task.Delay(50);
        //var sysreal = MapDescriptorToSystemUserReal(newSystemUserDescriptor);
        SystemUser newSystemUser = MapDescriptorToSystemUser(newSystemUserDescriptor);
        _systemUserList.Add(newSystemUser);
        return newSystemUser;
    }

    private SystemUser MapDescriptorToSystemUser(SystemUserDescriptor newSystemUserDescriptor)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteSystemUserReal(Guid id, CancellationToken cancellationToken = default)
    {
        await Task.Delay(50);
        SystemUser? toDelete = _systemUserList.Find(i => i.Id == id.ToString());        
        if (toDelete is null) return false;
        _systemUserList.Remove(toDelete);
        return true;
    }

    public async Task<bool> ChangeSystemUserRealTitle(string newTitle, Guid id, CancellationToken cancellationToken = default)
    {
        await Task.Delay(50);
        throw new NotImplementedException();
    }

    public async Task<bool> ChangeSystemUserRealDescription(string newDescr, Guid id, CancellationToken cancellationToken = default)
    {
        await Task.Delay(50);
        throw new NotImplementedException();
    }

    public async Task<List<SystemUser>> GetSystemUserRealsForChosenUser(int id, CancellationToken cancellationToken = default)
    {
        await Task.Delay(50);
        return _systemUserList;
    }

    public async Task<bool> ChangeSystemUserRealProduct(string selectedSystemType, Guid id, CancellationToken cancellationToken = default)
    {
        await Task.Delay(50);
        throw new NotImplementedException();
    }
}
