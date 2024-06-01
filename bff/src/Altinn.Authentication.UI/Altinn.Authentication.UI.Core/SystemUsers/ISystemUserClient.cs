namespace Altinn.Authentication.UI.Core.SystemUsers;

public interface ISystemUserClient
{
    Task<SystemUser?> GetSpecificSystemUserReal(int partyId, Guid id, CancellationToken cancellationToken = default);
    Task<SystemUser?> PostNewSystemUserReal(string partyOrgNo, SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellation = default);
    Task<bool> DeleteSystemUserReal(Guid id, CancellationToken cancellationToken = default);
    Task<bool> ChangeSystemUserRealTitle(string newTitle, Guid id, CancellationToken cancellationToken = default);
    Task<bool> ChangeSystemUserRealDescription(string newDescr, Guid id, CancellationToken cancellationToken = default);
    Task<List<SystemUser>> GetSystemUserRealsForChosenUser(int id, CancellationToken cancellationToken = default);
    Task<bool> ChangeSystemUserRealProduct(string selectedSystemType, Guid id, CancellationToken cancellationToken = default);
}
