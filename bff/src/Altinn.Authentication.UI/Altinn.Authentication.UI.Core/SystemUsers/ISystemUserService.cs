namespace Altinn.Authentication.UI.Core.SystemUsers;


/// <summary>
/// The middleman between the BFF's SystemUserAPI and Altinn's real SystemUserAPI 
/// </summary>
public interface ISystemUserService
{
    Task<List<SystemUserDTO>> GetAllSystemUserDTOsForChosenUser(Guid id, CancellationToken cancellationToken = default);
    Task<SystemUserDTO?> GetSpecificSystemUserDTO(Guid id, CancellationToken cancellationToken = default);
    Task<Guid> PostNewSystemUserDescriptor(SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellation = default);
    Task<bool> DeleteSystemUser(Guid id, CancellationToken cancellationToken = default);
    Task<bool> ChangeSystemUserTitle(string newTitle, Guid id, CancellationToken cancellationToken = default);
    Task<bool> ChangeSystemUserDescription(string newDescr, Guid id, CancellationToken cancellationToken = default);
}
