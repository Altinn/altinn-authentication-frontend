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
    public string? IntegrationTitle { get; set; }

    /// <summary>
    /// The actual chosen systemType that this SystemUser
    /// creates an integration / delegation for
    /// </summary>
    public string? SelectedSystemType { get; set; }

    /// <summary>
    /// Only set if the end-user has a self-made system
    /// and not an off-the-shelf system
    /// </summary>
    public string? ClientId { get; set; }

    /// <summary>
    /// The OwnedByParty identifies the end-user's organisation/person, and is fetched by the BFF from the login Context Cookie
    /// </summary>
    public string? OwnedByPartyId { get; set; }
}
                          