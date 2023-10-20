namespace Altinn.Authentication.UI.Core.SystemUsers;

/// <summary>
/// When the Frontend POST a new SystemUser this is the descriptor
/// passed deeper into the layers to create the new Entity 
/// </summary>
public class SystemUserDescriptor
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? SystemType { get; set; }
    public string? ClientId { get; set; }
    public string? PartyId { get; set; }
}
