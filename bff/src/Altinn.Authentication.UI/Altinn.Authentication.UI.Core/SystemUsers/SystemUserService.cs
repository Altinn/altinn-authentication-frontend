namespace Altinn.Authentication.UI.Core.SystemUsers;

public class SystemUserService : ISystemUserService
{
    private readonly ISystemUserClient _systemUserClient;

    public SystemUserService(ISystemUserClient systemUserClient)
    {
        _systemUserClient = systemUserClient;
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
        var lista = await _systemUserClient.GetSystemUserRealsForChosenUser(id, cancellationToken);
        //List<SystemUserDTO> listofDTOs = new();
        //foreach(var sur in listofReal) {
        //    var dto = MapFromSystemUserRealToDTO(sur);
        //    if (dto is not null)  listofDTOs.Add(dto); 
        //}
        return lista;
    }

    public async Task<SystemUser?> GetSpecificSystemUserDTO(int partyId, Guid id, CancellationToken cancellationToken = default)
    {
        //return MapFromSystemUserRealToDTO(await _systemUserClient.GetSpecificSystemUserReal(partyId ,id, cancellationToken));
        return await _systemUserClient.GetSpecificSystemUserReal(partyId, id, cancellationToken);
    }

    private static SystemUserDTO? MapFromSystemUserRealToDTO(SystemUserReal? systemUserReal)
    {
        if (systemUserReal is null) return null;
        SystemUserDTO systemUserDTO = new()
        {
            IntegrationTitle = systemUserReal.Title,
            Description = systemUserReal.Description,
            Created = systemUserReal.Created,
            // ClientId = systemUserReal.ClientId,//Not a deliverable in the first Phase of the Project
            ProductName = systemUserReal.SystemType,
            SupplierName = "Not implemented yet",
            SupplierOrgno = "999999999MVA", 
            Id = systemUserReal.Id,
            OwnedByPartyId = systemUserReal.OwnedByPartyId,
        };

        return systemUserDTO;
    }

    public async Task<SystemUser?> PostNewSystemUserDescriptor(int partyId, SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellation = default)
    {
        return await _systemUserClient.PostNewSystemUserReal(partyId, newSystemUserDescriptor, cancellation);
    }

    public async Task<bool> ChangeSystemUserProduct(string selectedSystemType, Guid id, CancellationToken cancellationToken = default)
    {
        return await _systemUserClient.ChangeSystemUserRealProduct(selectedSystemType, id, cancellationToken);
    }
}
