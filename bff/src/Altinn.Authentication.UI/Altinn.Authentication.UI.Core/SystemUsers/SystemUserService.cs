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

    public async  Task<bool> ChangeSystemUserTitle(string newTitle, Guid id, CancellationToken cancellationToken = default)
    {
        return await _systemUserClient.ChangeSystemUserRealTitle(newTitle, id, cancellationToken);
    }

    public async Task<Result<bool>> DeleteSystemUser(int partyId, Guid id, CancellationToken cancellationToken = default)
    {
        return await _systemUserClient.DeleteSystemUserReal(partyId, id, cancellationToken);
    }

    public async Task<Result<List<SystemUser>>> GetAllSystemUsersForParty(int partyId, CancellationToken cancellationToken = default)
    {
        AuthorizedPartyExternal? party = await _accessManagementClient.GetPartyFromReporteeListIfExists(partyId);
        if (party is null)
        {
            return Problem.Reportee_Orgno_NotFound;
        }
        
        var lista = await _systemUserClient.GetSystemUserRealsForChosenUser(partyId, cancellationToken);
        List<PartyName> partyNames = await _registerClient.GetPartyNamesForOrganization(lista.Select(x => x.SupplierOrgNo), cancellationToken);

        foreach (SystemUser systemUser in lista)
        {
            await AddRights(systemUser, cancellationToken);
            systemUser.SupplierName = partyNames.Find(x => x.OrgNo == systemUser.SupplierOrgNo)?.Name ?? "N/A";
        }

        return lista;
    }

    public async Task<SystemUser?> GetSpecificSystemUserDTO(int partyId, Guid id, CancellationToken cancellationToken = default)
    {
        SystemUser? systemUser = await _systemUserClient.GetSpecificSystemUserReal(partyId, id, cancellationToken);
        if (systemUser != null)
        {
            await AddRights(systemUser, cancellationToken);
            List<PartyName> partyNames = await _registerClient.GetPartyNamesForOrganization([systemUser.SupplierOrgNo], cancellationToken);
            systemUser.SupplierName = partyNames[0]?.Name ?? "N/A";
        }

        return systemUser;
    }

    public async Task<Result<CreateSystemUserResponse>> CreateSystemUserV2(int partyId, SystemUserRequestDto newSystemUser, CancellationToken cancellation = default)
    {
        AuthorizedPartyExternal? party = await _accessManagementClient.GetPartyFromReporteeListIfExists(partyId);
        if (party is null)
        {
            return Problem.Reportee_Orgno_NotFound;
        }

        return await _systemUserClient.CreateSystemUser(partyId, newSystemUser, cancellation);
    }

    private async Task AddRights(SystemUser systemUser, CancellationToken cancellationToken)
    {
        
        // TODO: rights for a systemuser is not 1:1 with system rights, but we have no way to 
        // get rights for a specific systemuser yet, so return the rights for the system for now.
        List<Right> rights = await _systemRegisterClient.GetRightsFromSystem(systemUser.SystemId, cancellationToken);
        
        // add resources
        systemUser.Resources = await _resourceRegistryClient.GetResources(rights, cancellationToken);
    }
}
