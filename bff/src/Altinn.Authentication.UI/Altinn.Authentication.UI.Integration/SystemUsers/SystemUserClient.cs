using Altinn.Authentication.UI.Core.SystemUsers;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Net.Http.Headers;

namespace Altinn.Authentication.UI.Integration.SystemUsers;

public class SystemUserClient : ISystemUserClient
{
    private static List<SystemUserReal> MockTestHelper()
    {
        //Mock Data
        SystemUserReal systemUser1 = new()
        {
            Id = "37ce1792-3b35-4d50-a07d-636017aa7dbd",
            Title = "Vårt regnskapsystem",
            Description = "Koblet opp mot Visma. Snakk med Pål om abonnement",
            SystemType = "Visma Skatt",
            OwnedByPartyId = "orgno:91235123",
            //ControlledBy = "orgno:92432454",
            Created = "2023-09-12"
        };

        SystemUserReal systemUser2 = new()
        {
            Id = "37ce1792-3b35-4d50-a07d-636017aa7dbe",
            Title = "Vårt andre regnskapsystem",
            Description = "Koblet opp mot Visvas. Snakk med Per om abonnement",
            SystemType = "Visma Visvas",
            OwnedByPartyId = "orgno:91235124",
            //ControlledBy = "orgno:92432455",
            Created = "2023-09-22"
        };

        SystemUserReal systemUser3 = new()
        {
            Id = "37ce1792-3b35-4d50-a07d-636017aa7dbf",
            Title = "Et helt annet system",
            Description = "Kai og Guri vet alt om dette systemet.",
            SystemType = "Fiken Superskatt",
            OwnedByPartyId = "orgno:91235125",
            //ControlledBy = "orgno:92432456",
            Created = "2023-09-22"
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
            Description = sysdescr.Description,
            Created = DateTime.UtcNow.Date.ToString()

        };       
    }

    public SystemUserClient()
    {
        _systemUserList = MockTestHelper();
    }
   
    public async Task<SystemUserReal?> GetSpecificSystemUserReal(Guid id, CancellationToken cancellationToken = default)
    {
        return _systemUserList.Find(i => i.Id == id.ToString());
    }

    public async Task<Guid> PostNewSystemUserReal(SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellation = default)
    {
        var sysreal = MapDescriptorToSystemUserReal(newSystemUserDescriptor);
        _systemUserList.Add(sysreal);
        return Guid.Parse(sysreal.Id!);
    }

    public async Task<bool> DeleteSystemUserReal(Guid id, CancellationToken cancellationToken = default)
    {
        SystemUserReal? toDelete = _systemUserList.Find(i => i.Id == id.ToString());        
        if (toDelete is null) return false;
        _systemUserList.Remove(toDelete);
        return true;
    }

    public Task<bool> ChangeSystemUserRealTitle(string newTitle, Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<bool> ChangeSystemUserRealDescription(string newDescr, Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public async Task<List<SystemUserReal>> GetSystemUserRealsForChosenUser(Guid id, CancellationToken cancellationToken = default)
    {
        return _systemUserList;
    }

    public Task<bool> ChangeSystemUserRealProduct(string selectedSystemType, Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
