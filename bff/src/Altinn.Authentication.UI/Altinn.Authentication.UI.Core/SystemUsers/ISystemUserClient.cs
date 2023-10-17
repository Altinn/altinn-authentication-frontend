namespace Altinn.Authentication.UI.Core.SystemUsers;

public interface ISystemUserClient
{
    Task<SystemUserReal?> GetSpecificSystemUserReal(Guid id, CancellationToken cancellationToken = default);
    Task<Guid> PostNewSystemUserReal(SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellation = default);
    Task<bool> DeleteSystemUserReal(Guid id, CancellationToken cancellationToken = default);
    Task<bool> ChangeSystemUserRealTitle(string newTitle, Guid id, CancellationToken cancellationToken = default);
    Task<bool> ChangeSystemUserRealDescription(string newDescr, Guid id, CancellationToken cancellationToken = default);
    Task<List<SystemUserReal>> GetSystemUserRealsForChosenUser(Guid id, CancellationToken cancellationToken = default);
}
