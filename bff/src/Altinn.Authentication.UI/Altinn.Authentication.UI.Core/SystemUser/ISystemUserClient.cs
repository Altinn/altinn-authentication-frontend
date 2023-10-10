namespace Altinn.Authentication.UI.Core.SystemUser;

public interface ISystemUserClient
{
    Task<SystemUserDTO> GetSystemUserDTO(Guid id, CancellationToken cancellationToken = default);
    Task<Guid> PostNewSystemUserDescriptor(SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellation = default);
    Task<bool> DeleteSystemUser(Guid id, CancellationToken cancellationToken = default);
    Task<bool> ChangeSystemUserTitle(string newTitle, Guid id, CancellationToken cancellationToken = default);
    Task<bool> ChangeSystemUserDescription(string newDescr, Guid id, CancellationToken cancellationToken = default);
}
