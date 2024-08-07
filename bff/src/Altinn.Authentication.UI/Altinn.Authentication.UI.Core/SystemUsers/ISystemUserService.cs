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
    Task<List<SystemUser>> GetAllSystemUsersForParty(int partyId, CancellationToken cancellationToken = default);
    Task<SystemUser?> GetSpecificSystemUserDTO(int partyId, Guid id, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Creates a system user
    /// </summary>
    Task<Result<SystemUser>> CreateSystemUser(int partyId, SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellation = default);
    
    /// <summary>
    /// Deletes system user
    /// </summary>
    Task<bool> DeleteSystemUser(Guid id, CancellationToken cancellationToken = default);
 
    /// <summary>
    /// Change system user title
    /// </summary>
    Task<bool> ChangeSystemUserTitle(string newTitle, Guid id, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Change system user description
    /// </summary>
    Task<bool> ChangeSystemUserDescription(string newDescr, Guid id, CancellationToken cancellationToken = default);
   
    /// <summary>
    /// Change system user product. To do. Do we need this?
    /// </summary>
    Task<bool> ChangeSystemUserProduct(string selectedSystemType, Guid id, CancellationToken cancellationToken = default);
}
