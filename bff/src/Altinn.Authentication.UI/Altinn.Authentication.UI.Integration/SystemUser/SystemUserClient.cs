using Altinn.Authentication.UI.Core.SystemUser;

namespace Altinn.Authentication.UI.Integration.SystemUser;

public class SystemUserClient : ISystemUserClient
{
    private static List<SystemUserDTO> MockTestHelper()
    {
        //Mock Data
        SystemUserDTO systemUser1 = new()
        {
            Id = "1",
            Title = "Vårt regnskapsystem",
            Description = "Koblet opp mot Visma. Snakk med Pål om abonnement",
            SystemType = "534-ADF-SF",
            Created = "2023-09-12",
            ClientId = "20578230597"
        };

        SystemUserDTO systemUser2 = new()
        {
            Id = "2",
            Title = "Vårt andre regnskapsystem",
            Description = "Koblet opp mot Visma. Snakk med Pål om abonnement",
            SystemType = "534-ADF-SF",
            Created = "2023-09-22",
            ClientId = "20578230598"
        };

        SystemUserDTO systemUser3 = new()
        {
            Id = "3",
            Title = "Et helt annet system",
            Description = "Fiken superskatt",
            SystemType = "lfhiwlfhi",
            Created = "2023-09-22",
            ClientId = "23523523"
        };

        List<SystemUserDTO> systemUserList = new()
        {
            systemUser1,
            systemUser2,
            systemUser3
        };

        return systemUserList;
    }

    private static List<SystemUserDTO> _systemUserList = new();

    public SystemUserClient()
    {
        _systemUserList = MockTestHelper();
    }

    public async Task<bool> ChangeSystemUserDescription(string newDescr, Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> ChangeSystemUserTitle(string newTitle, Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteSystemUser(Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public async Task<SystemUserDTO> GetSystemUserDTO(Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public async Task<Guid> PostNewSystemUserDescriptor(SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellation = default)
    {
        throw new NotImplementedException();
    }
}
