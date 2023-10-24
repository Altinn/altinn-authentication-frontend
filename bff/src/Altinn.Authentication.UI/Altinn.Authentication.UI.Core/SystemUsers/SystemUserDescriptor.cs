namespace Altinn.Authentication.UI.Core.SystemUsers;

/// <summary>
/// When the Frontend POST a new SystemUser this is the descriptor
/// passed deeper into the layers to create the new Entity 
/// </summary>
public class SystemUserDescriptor
{
    /// <summary>
    /// Friendly name chosen by the end-user
    /// </summary>
    public string? Title { get; set; }

    /// <summary>
    /// Either set by the end-user as instructions to self,
    /// or provided by the SystemType as extra info
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// The actual chosen systemType that this SystemUser
    /// creates an integration / delegation for
    /// </summary>
    public string? SystemType { get; set; }

    /// <summary>
    /// Only set if the end-user has a self-made system
    /// and not an off-the-shelf system
    /// </summary>
    public string? ClientId { get; set; }

    /// <summary>
    /// The OwnedBy and ControlledBy identifies the end-user, and is fetched from the login Context and
    /// user profile serivces
    /// </summary>
    public string? OwnedByPartyId { get; set; }
    //public string? ControlledBy { get; set; }


}
