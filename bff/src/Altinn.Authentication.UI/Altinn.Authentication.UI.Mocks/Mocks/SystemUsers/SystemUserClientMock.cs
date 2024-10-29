using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Authorization.ProblemDetails;

namespace Altinn.Authentication.UI.Mocks.SystemUsers;

public class SystemUserClientMock : ISystemUserClient
{
    private static List<SystemUser> MockTestHelper()
    {
        //Mock Data
        SystemUser systemUser1 = new()
        {
            Id = "37ce1792-3b35-4d50-a07d-636017aa7dbd",
            IntegrationTitle = "Vårt regnskapsystem",
            SystemId = "987654321_regnvær_regnskap_system",
            PartyId = "91235123",
            Created = System.DateTime.UtcNow,
            IsDeleted = false,
            ReporteeOrgNo = "123456789",
            SupplierName = "Regnvær AS",
            SupplierOrgNo = "987654321",
            SystemInternalId = Guid.NewGuid(),
        };

        SystemUser systemUser2 = new()
        {
            Id = "37ce1792-3b35-4d50-a07d-636017aa7dbe",
            IntegrationTitle = "Vårt regnskapsystem",
            SystemId = "987654322_regnfullhøst_regnskap_system",
            PartyId = "91235123",
            Created = System.DateTime.UtcNow,
            IsDeleted = false,
            ReporteeOrgNo = "123456789",
            SupplierName = "Regnfull Høst ASA",
            SupplierOrgNo = "987654322",
            SystemInternalId = Guid.NewGuid(),
        };

        SystemUser systemUser3 = new()
        {
            Id = "37ce1792-3b35-4d50-a07d-636017aa7dbf",
            IntegrationTitle = "Vårt regnskapsystem",
            SystemId = "987654323_regnskog_regnskap_system",
            PartyId = "91235123",
            Created = System.DateTime.UtcNow,
            IsDeleted = false,
            ReporteeOrgNo = "123456789",
            SupplierName = "Regnskog AS",
            SupplierOrgNo = "987654323",
            SystemInternalId = Guid.NewGuid(),
        };

    List<SystemUser> systemUserList =
        [
            systemUser1,
            systemUser2,
            systemUser3
        ];

        return systemUserList;
    }

    private List<SystemUser> MockTestHelperNew()
    {
        return [];
    }

    private readonly HttpClient _httpClient;
    private readonly IAccessManagementClient _partyClient;
    private static List<SystemUser> _systemUserList = [];

    public SystemUserClientMock(HttpClient httpClient, IAccessManagementClient partyClient)
    {
        _partyClient = partyClient;
        _httpClient = httpClient;
        _systemUserList = MockTestHelper();
    }
   
    public async Task<SystemUser?> GetSpecificSystemUserReal(int partyId, Guid id, CancellationToken cancellationToken = default)
    {
        await Task.Delay(50);
        return _systemUserList.Find(i => i.Id == id.ToString());
    }

    public async Task<Result<bool>> DeleteSystemUserReal(int partyId, Guid id, CancellationToken cancellationToken = default)
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

    public async Task<List<SystemUser>> GetSystemUserRealsForChosenUser(int id, CancellationToken cancellationToken = default)
    {
        await Task.Delay(50);
        return _systemUserList;
    }

    public Task<Result<CreateSystemUserResponse>> CreateSystemUser(int partyId, SystemUserRequestDto newSystemUserDescriptor, CancellationToken cancellation = default)
    {
        throw new NotImplementedException();
    }
}
