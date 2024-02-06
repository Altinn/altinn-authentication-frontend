namespace Altinn.Authentication.UI.Core.SystemUsers;


/// <summary>
/// The "middleware" between the BFF's SystemUserAPI and Altinn's real SystemUserAPI in the Authentication Component
/// </summary>
public interface ISystemUserService
{
    Task<List<SystemUserDTO>> GetAllSystemUserDTOsForChosenUser(int id, CancellationToken cancellationToken = default);
    Task<SystemUserDTO?> GetSpecificSystemUserDTO(int partyId, Guid id, CancellationToken cancellationToken = default);
    Task<SystemUserReal?> PostNewSystemUserDescriptor(int partyId, SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellation = default);
    Task<bool> DeleteSystemUser(Guid id, CancellationToken cancellationToken = default);
    Task<bool> ChangeSystemUserTitle(string newTitle, Guid id, CancellationToken cancellationToken = default);
    Task<bool> ChangeSystemUserDescription(string newDescr, Guid id, CancellationToken cancellationToken = default);
    Task<bool> ChangeSystemUserProduct(string selectedSystemType, Guid id, CancellationToken cancellationToken = default);
}
