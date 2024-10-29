using Altinn.Authorization.ProblemDetails;

namespace Altinn.Authentication.UI.Core.SystemUsers;

/// <summary>
/// The "middleware" between the BFF's SystemUserAPI and Altinn's real SystemUserAPI in the Authentication Component
/// </summary>
public interface ISystemUserService
{
    /// <summary>
    /// Return all system users created for a given party
    /// </summary>
    Task<Result<List<SystemUser>>> GetAllSystemUsersForParty(int partyId, CancellationToken cancellationToken = default);
    Task<SystemUser?> GetSpecificSystemUserDTO(int partyId, Guid id, CancellationToken cancellationToken = default);

    Task<Result<CreateSystemUserResponse>> CreateSystemUserV2(int partyId, SystemUserRequestDto newSystemUserDescriptor, CancellationToken cancellation = default);

    /// <summary>
    /// Deletes system user
    /// </summary>
    Task<Result<bool>> DeleteSystemUser(int partyId, Guid id, CancellationToken cancellationToken = default);
 
    /// <summary>
    /// Change system user title
    /// </summary>
    Task<bool> ChangeSystemUserTitle(string newTitle, Guid id, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Change system user description
    /// </summary>
    Task<bool> ChangeSystemUserDescription(string newDescr, Guid id, CancellationToken cancellationToken = default);
}
