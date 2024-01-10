using Altinn.Authentication.UI.Core.SystemUsers;

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

    private static List<SystemUserReal> _systemUserList = new();

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

    public SystemUserClientMock()
    {
        _systemUserList = MockTestHelper();
    }
   
    public async Task<SystemUserReal?> GetSpecificSystemUserReal(int partyId, Guid id, CancellationToken cancellationToken = default)
    {
        await Task.Delay(50);
        return _systemUserList.Find(i => i.Id == id.ToString());
    }

    public async Task<SystemUserReal> PostNewSystemUserReal(SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellation = default)
    {
        await Task.Delay(50);
        var sysreal = MapDescriptorToSystemUserReal(newSystemUserDescriptor);
        _systemUserList.Add(sysreal);
        return sysreal;
    }

    public async Task<bool> DeleteSystemUserReal(Guid id, CancellationToken cancellationToken = default)
    {
        await Task.Delay(50);
        SystemUserReal? toDelete = _systemUserList.Find(i => i.Id == id.ToString());        
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

    public async Task<List<SystemUserReal>> GetSystemUserRealsForChosenUser(int id, CancellationToken cancellationToken = default)
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
