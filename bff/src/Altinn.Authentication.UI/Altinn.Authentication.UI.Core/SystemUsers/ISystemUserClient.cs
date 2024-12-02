using Altinn.Authorization.ProblemDetails;

namespace Altinn.Authentication.UI.Core.SystemUsers;

public interface ISystemUserClient
{
    Task<SystemUser?> GetSpecificSystemUserReal(int partyId, Guid id, CancellationToken cancellationToken = default);
    Task<Result<SystemUser>> CreateSystemUser(int partyId, SystemUserRequestDto newSystemUser, CancellationToken cancellation = default);
    Task<Result<bool>> DeleteSystemUserReal(int partyId, Guid id, CancellationToken cancellationToken = default);
    Task<bool> ChangeSystemUserRealTitle(string newTitle, Guid id, CancellationToken cancellationToken = default);
    Task<List<SystemUser>> GetSystemUserRealsForChosenUser(int id, CancellationToken cancellationToken = default);
}
