namespace Altinn.Authentication.UI.Models;

public sealed record ProfileInfo
{
    public string? LoggedInPersonName { get; set; }
    public string? RepresentingPartyName { get; set; }
    public bool? CanCreateSystemUser { get; set; }
}
