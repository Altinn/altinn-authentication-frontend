using Altinn.Authentication.UI.Core.SystemUsers;
using System.Net.Http.Headers;

namespace Altinn.Authentication.UI.Integration.SystemUsers;

public class SystemUserClient : ISystemUserClient
{
    private static List<SystemUserReal> MockTestHelper()
    {
        //Mock Data
        SystemUserReal systemUser1 = new()
        {
            Id = "1",
            Title = "Vårt regnskapsystem",
            Description = "Koblet opp mot Visma. Snakk med Pål om abonnement",
            SystemType = "534-ADF-SF",
            Created = "2023-09-12",
            ClientId = "20578230597"
        };

        SystemUserReal systemUser2 = new()
        {
            Id = "2",
            Title = "Vårt andre regnskapsystem",
            Description = "Koblet opp mot Visma. Snakk med Pål om abonnement",
            SystemType = "534-ADF-SF",
            Created = "2023-09-22",
            ClientId = "20578230598"
        };

        SystemUserReal systemUser3 = new()
        {
            Id = "3",
            Title = "Et helt annet system",
            Description = "Fiken superskatt",
            SystemType = "lfhiwlfhi",
            Created = "2023-09-22",
            ClientId = "23523523"
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
            SystemType = "OnlyForTest",
            Title = sysdescr.Title,
            Description = sysdescr.Title,
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
}
