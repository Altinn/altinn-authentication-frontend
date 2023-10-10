namespace Altinn.Authentication.UI.Core.SystemUser;

/// <summary>
/// Used in the Frontend to present the SystemUser
/// </summary>
public sealed record SystemUserDTO
{
    public string? Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? SystemType { get; set; }
    public string? Created { get; set; }
    public string? ClientId { get; set; }
}
