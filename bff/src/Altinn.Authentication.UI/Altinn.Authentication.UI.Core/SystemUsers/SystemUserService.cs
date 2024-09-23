using Altinn.Authentication.UI.Core.Common.Models;
using Altinn.Authentication.UI.Core.Common.Problems;
using Altinn.Authentication.UI.Core.Common.Rights;
using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Authorization.ProblemDetails;
using Altinn.Platform.Register.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Text.Json;

namespace Altinn.Authentication.UI.Core.SystemUsers;

public class SystemUserService : ISystemUserService
{
    private readonly ISystemUserClient _systemUserClient;
    private readonly IAccessManagementClient _accessManagementClient;
    private readonly ISystemRegisterClient _systemRegisterClient;
    private readonly IRegisterClient _registerClient;
    private readonly IResourceRegistryClient _resourceRegistryClient;

    public SystemUserService(
        ISystemUserClient systemUserClient,
        IAccessManagementClient accessManagementClient,
        ISystemRegisterClient systemRegisterClient,
        IRegisterClient registerClient,
        IResourceRegistryClient resourceRegistryClient)
    {
        _systemUserClient = systemUserClient;
        _accessManagementClient = accessManagementClient;
        _systemRegisterClient = systemRegisterClient;
        _registerClient = registerClient;
        _resourceRegistryClient = resourceRegistryClient;
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

        foreach (SystemUser systemUser in lista)
        {
            AddRightsAndVendorName(systemUser, cancellationToken);
        }

        return lista;
    }

    public async Task<SystemUser?> GetSpecificSystemUserDTO(int partyId, Guid id, CancellationToken cancellationToken = default)
    {
        SystemUser systemUser = await _systemUserClient.GetSpecificSystemUserReal(partyId, id, cancellationToken);
        AddRightsAndVendorName(systemUser, cancellationToken);
        return systemUser;
    }

    public async Task<Result<SystemUser>> CreateSystemUser(int partyId, CreateSystemUserRequestToAuthComp newSystemUserDescriptor, CancellationToken cancellation = default)
    {
        AuthorizedPartyExternal? party = await _accessManagementClient.GetPartyFromReporteeListIfExists(partyId);
        if(party is null) {return Problem.Reportee_Orgno_NotFound;}
        string partyOrgNo = party.OrganizationNumber;
        newSystemUserDescriptor.ReporteeOrgNo = partyOrgNo;

        DelegationCheckResult delegationCheckFinalResult = await UserDelegationCheckForReportee(partyId, newSystemUserDescriptor.SelectedSystemType!, cancellation);
        if (!delegationCheckFinalResult.CanDelegate || delegationCheckFinalResult.RightResponses is null) {return Problem.Rights_NotFound_Or_NotDelegable;}

        SystemUser? systemUser = await _systemUserClient.PostNewSystemUserReal(partyId, newSystemUserDescriptor, cancellation);
        if (systemUser is null) {return Problem.SystemUser_FailedToCreate;}

        Result<bool> delegationSucceeded = await _accessManagementClient.DelegateRightToSystemUser(partyId.ToString(),systemUser, delegationCheckFinalResult.RightResponses);
        if (delegationSucceeded.IsProblem) { return delegationSucceeded.Problem;}

        return systemUser;
    }

    public async Task<bool> ChangeSystemUserProduct(string selectedSystemType, Guid id, CancellationToken cancellationToken = default)
    {
        return await _systemUserClient.ChangeSystemUserRealProduct(selectedSystemType, id, cancellationToken);
    }

    private async Task<DelegationCheckResult> UserDelegationCheckForReportee(int partyId, string systemId ,CancellationToken cancellationToken = default)
    {        
        List<Right> rights = await _systemRegisterClient.GetRightFromSystem(systemId, cancellationToken);
        List<RightResponses> rightResponsesList = [];
                  
        foreach (Right right in rights)
        {
            DelegationCheckRequest request = new()
            {
                Resource = right.Resource
            };

            List<DelegationResponseData>? rightResponses = await _accessManagementClient.CheckDelegationAccess(partyId.ToString(), request);

            if (rightResponses is null) { return new DelegationCheckResult(false, null); }

            if (!ResolveIfHasAccess(rightResponses)) { return new DelegationCheckResult(false, null);}

            rightResponsesList.Add( new RightResponses( rightResponses));
        }

        return new DelegationCheckResult(true, rightResponsesList);
    }

    private static bool ResolveIfHasAccess(List<DelegationResponseData> rightResponse)
    {      

        foreach( var data in rightResponse)
        {
            if (data.Status != "Delegable")
                return false;
        }

        return true;
    }

    private async void AddRightsAndVendorName(SystemUser systemUser, CancellationToken cancellationToken)
    {
        List<Right> rights = await _systemRegisterClient.GetRightFromSystem(systemUser.SystemId, cancellationToken);
            
            // add resources
            foreach (Right right in rights)
            {
                string? resourceId = right.Resource.Find(x => x.Id == "urn:altinn:resource")?.Value;

                if (resourceId != null) 
                {
                    systemUser.Rights.Add(new RightFrontEnd() 
                    {
                        Resource = right.Resource,
                        ServiceResource = await _resourceRegistryClient.GetResource(resourceId, cancellationToken)
                    });
                }
            }

            // add system name
            try
            {
                systemUser.SupplierName =
                    (await _registerClient.GetPartyForOrganization(systemUser.SupplierOrgNo)).Organization.Name;
            }
            catch (Exception ex)
            {
                systemUser.SupplierName = "N/A"; // "N/A" stands for "Not Available
                Console.Write(ex.ToString());
            }
    }
}
