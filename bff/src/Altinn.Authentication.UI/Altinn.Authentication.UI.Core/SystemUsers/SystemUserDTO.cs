namespace Altinn.Authentication.UI.Core.SystemUsers;

/// <summary>
/// Used in the Frontend to present the SystemUser
/// </summary>
public sealed record SystemUserDTO
{
    public string? Id { get; set; }
    public string? IntegrationTitle { get; set; }
    public string? Description { get; set; }
    public string? ProductName { get; set; }
    public string? SupplierName { get; set; }
    public string? SupplierOrgno { get; set; }
    public string? OwnedByPartyId { get; set; }
    //public string? ControlledBy { get; set; }
    public string? Created { get; set; }

    //Not a deliverable in the first Phase in jan 2023
    //public string? ClientId { get; set; }
}
