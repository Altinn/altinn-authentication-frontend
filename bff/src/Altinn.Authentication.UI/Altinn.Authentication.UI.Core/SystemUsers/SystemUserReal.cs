namespace Altinn.Authentication.UI.Core.SystemUsers;


public sealed class SystemUserReal

{
    public string? Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }

    /// <summary>
    /// For off the shelf systems.
    /// Should probably be a human readable but unique string without whitespace
    /// </summary>
    public string? SystemType { get; set; }
    public string? OwnedBy { get; set; }
    public string? ControlledBy { get; set; }
    public string? Created { get; set; }

    /// <summary>
    /// For self-made systems
    /// </summary>
    public string? ClientId { get; set; }
}
