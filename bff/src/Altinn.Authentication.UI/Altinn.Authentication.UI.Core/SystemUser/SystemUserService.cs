namespace Altinn.Authentication.UI.Core.SystemUser;

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

    public async Task<List<SystemUserDTO>> GetAllSystemUserDTOsForChosenUser(Guid id, CancellationToken cancellationToken = default)
    {
        var listofReal = await _systemUserClient.GetSystemUserRealsForChosenUser(id, cancellationToken);
        List<SystemUserDTO> listofDTOs = new();
        foreach(var su in listofReal) { listofDTOs.Add(MapFromSystemUserRealToDTO(su)); }
        return listofDTOs;
    }

    public async Task<SystemUserDTO> GetSpecificSystemUserDTO(Guid id, CancellationToken cancellationToken = default)
    {              
        return MapFromSystemUserRealToDTO(await _systemUserClient.GetSpecificSystemUserReal(id, cancellationToken));
    }

    private SystemUserDTO MapFromSystemUserRealToDTO(SystemUserReal systemUserReal)
    {

        SystemUserDTO systemUserDTO = new()
        {
            Title = systemUserReal.Title,
            Description = systemUserReal.Description,
            Created = systemUserReal.Created,
            ClientId = systemUserReal.ClientId,
            SystemType = systemUserReal.SystemType,
            Id = systemUserReal.Id
        };

        return systemUserDTO;
    }

    public async Task<Guid> PostNewSystemUserDescriptor(SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellation = default)
    {
        return await _systemUserClient.PostNewSystemUserReal(newSystemUserDescriptor, cancellation);
    }
}
