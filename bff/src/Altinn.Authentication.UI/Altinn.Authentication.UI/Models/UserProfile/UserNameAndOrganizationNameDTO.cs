namespace Altinn.Authentication.UI.Models;

public sealed record UserNameAndOrganizatioNameDTO
{
    public string? UserName { get; set; }
    public string? OrganizationName { get; set; }

    public string? PartyId { get; set; }

    public string? UserId { get; set; }
}
