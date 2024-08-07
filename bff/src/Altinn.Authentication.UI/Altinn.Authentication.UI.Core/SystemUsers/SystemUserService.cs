using Altinn.Authentication.UI.Core.Common.Models;
using Altinn.Authentication.UI.Core.Common.Rights;
using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Platform.Register.Models;
using System.Text.Json;

namespace Altinn.Authentication.UI.Core.SystemUsers;

public class SystemUserService : ISystemUserService
{
    private readonly ISystemUserClient _systemUserClient;
    private readonly IAccessManagementClient _accessManagementClient;
    private readonly ISystemRegisterClient _systemRegisterClient;

    public SystemUserService(
        ISystemUserClient systemUserClient,
        IAccessManagementClient accessManagementClient,
        ISystemRegisterClient systemRegisterClient)
    {
        _systemUserClient = systemUserClient;
        _accessManagementClient = accessManagementClient;
        _systemRegisterClient = systemRegisterClient;
    }

    public async Task<bool> ChangeSystemUserDescription(string newDescr, Guid id, CancellationToken cancellationToken = default)
    {
        return await _systemUserClient.ChangeSystemUserRealDescription(newDescr, id, cancellationToken);
    }

    public async  Task<bool> ChangeSystemUserTitle(string newTitle, Guid id, CancellationToken cancellationToken = default)
    {
        return await _systemUserClient.ChangeSystemUserRealTitle(newTitle, id, cancellationToken);
    }

    public async Task<bool> DeleteSystemUser(Guid id, CancellationToken cancellationToken = default)
    {
        return await _systemUserClient.DeleteSystemUserReal(id, cancellationToken);
    }

    public async Task<List<SystemUser>> GetAllSystemUsersForParty(int id, CancellationToken cancellationToken = default)
    {
        AuthorizedPartyExternal reportee = await _accessManagementClient.GetPartyFromReporteeListIfExists(id);
        string reporteeOrgNo = reportee.OrganizationNumber;
        int reporteePartyId = reportee.PartyId;
        
        var lista = await _systemUserClient.GetSystemUserRealsForChosenUser(reporteePartyId, cancellationToken);
        return lista;
    }

    public async Task<SystemUser?> GetSpecificSystemUserDTO(int partyId, Guid id, CancellationToken cancellationToken = default)
    {
        return await _systemUserClient.GetSpecificSystemUserReal(partyId, id, cancellationToken);
    }

    public async Task<SystemUser?> CreateSystemUser(int partyId, SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellation = default)
    {
        AuthorizedPartyExternal party = await _accessManagementClient.GetPartyFromReporteeListIfExists(partyId);        
        string partyOrgNo = party.OrganizationNumber;

        (List<DelegationResponseData>? rightResponse, bool canDelegate)  = await UserDelegationCheckForReportee(partyId, newSystemUserDescriptor.SelectedSystemType!, cancellation);
        if (!canDelegate || rightResponse is null) return null;

        SystemUser? systemUser = await _systemUserClient.PostNewSystemUserReal(partyOrgNo, newSystemUserDescriptor, cancellation);
        if(systemUser is null) return null;

        bool delagationSucceeded = await _accessManagementClient.DelegateRightToSystemUser(partyId.ToString(),systemUser, rightResponse!);
        if (delagationSucceeded) return systemUser;

        return null;        
    }

    public async Task<bool> ChangeSystemUserProduct(string selectedSystemType, Guid id, CancellationToken cancellationToken = default)
    {
        return await _systemUserClient.ChangeSystemUserRealProduct(selectedSystemType, id, cancellationToken);
    }

    public async Task<(List<DelegationResponseData>?,bool)> UserDelegationCheckForReportee(int partyId, string systemId ,CancellationToken cancellationToken = default)
    {        
        List<Right> rights = await _systemRegisterClient.GetRightFromSystem(systemId, cancellationToken);
        DelegationCheckRequest request = new()
        {
            Resource = rights[0].Resource  
        };

        List<DelegationResponseData>? rightResponse = await _accessManagementClient.CheckDelegationAccess(partyId.ToString(), request);
        Console.WriteLine("RTLDEBUG1 " + JsonSerializer.Serialize(rightResponse));
        bool canDelegate = ResolveIfHasAccess(rightResponse);
        Console.WriteLine("RTLDEBUG2 " + canDelegate);

        return (rightResponse, canDelegate);
    }

    private static bool ResolveIfHasAccess(List<DelegationResponseData>? rightResponse)
    {
        if (rightResponse == null) { return false; }

        foreach( var data in rightResponse)
        {
            if (data.Status != "Delegable")
                return false;
        }

        return true;
    }
}
