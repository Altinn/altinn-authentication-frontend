using Altinn.Authentication.UI.Core.Common.Models;
using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Platform.Register.Models;

namespace Altinn.Authentication.UI.Core.SystemUsers;

public class SystemUserService : ISystemUserService
{
    private readonly ISystemUserClient _systemUserClient;
    private readonly IAccessManagementClient _partyLookUpClient;
    private readonly ISystemRegisterClient _systemRegisterClient;

    public SystemUserService(
        ISystemUserClient systemUserClient,
        IAccessManagementClient partyLookUpClient,
        ISystemRegisterClient systemRegisterClient)
    {
        _systemUserClient = systemUserClient;
        _partyLookUpClient = partyLookUpClient;
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

    public async Task<List<SystemUser>> GetAllSystemUserDTOsForChosenUser(int id, CancellationToken cancellationToken = default)
    {
        AuthorizedPartyExternal reportee = await _partyLookUpClient.GetPartyFromReporteeListIfExists(id);
        string reporteeOrgNo = reportee.OrganizationNumber;
        int reporteePartyId = reportee.PartyId;
        
        var lista = await _systemUserClient.GetSystemUserRealsForChosenUser(reporteePartyId, cancellationToken);
        return lista;
    }

    public async Task<SystemUser?> GetSpecificSystemUserDTO(int partyId, Guid id, CancellationToken cancellationToken = default)
    {
        //return MapFromSystemUserRealToDTO(await _systemUserClient.GetSpecificSystemUserReal(partyId ,id, cancellationToken));
        return await _systemUserClient.GetSpecificSystemUserReal(partyId, id, cancellationToken);
    }

    public async Task<SystemUser?> PostNewSystemUserDescriptor(int partyId, SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellation = default)
    {
        AuthorizedPartyExternal party = await _partyLookUpClient.GetPartyFromReporteeListIfExists(partyId);        
        string partyOrgNo = party.OrganizationNumber;
        bool canDelegate = await UserDelegationCheckForReportee(partyId, newSystemUserDescriptor.SelectedSystemType!, cancellation);
        if (canDelegate)
        {
            return await _systemUserClient.PostNewSystemUserReal(partyOrgNo, newSystemUserDescriptor, cancellation);
        }

        else return null;
        
    }

    public async Task<bool> ChangeSystemUserProduct(string selectedSystemType, Guid id, CancellationToken cancellationToken = default)
    {
        return await _systemUserClient.ChangeSystemUserRealProduct(selectedSystemType, id, cancellationToken);
    }

    public async Task<bool> UserDelegationCheckForReportee(int loggedInPartyId, string systemId ,CancellationToken cancellationToken = default)
    {
        AuthorizedPartyExternal reportee = await _partyLookUpClient.GetPartyFromReporteeListIfExists(loggedInPartyId);
        int reporteePartyId = reportee.PartyId;

        //List<AttributePair> resource =
        //    [
        //        new AttributePair
        //        {
        //            Id = "urn:altinn:resource",
        //            Value = "kravogbetalinger",
        //        }
        //    ];

        //Right right = new() 
        //{
        //    Resources = resource,
        //};

        List<Right> right = await _systemRegisterClient.GetRightFromSystem(systemId, cancellationToken);

        return ResolveIfHasAccess(await _partyLookUpClient.CheckDelegationAccess(reporteePartyId.ToString(), right));
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
