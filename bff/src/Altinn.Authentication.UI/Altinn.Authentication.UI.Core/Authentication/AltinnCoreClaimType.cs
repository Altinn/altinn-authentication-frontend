namespace Altinn.Authentication.UI.Core.Authentication;

/// <summary>
/// The different Claim types used by the HttpContext.User
/// </summary>
public static class AltinnCoreClaimType
{
    public const string AuthenticationLevel = "urn:altinn:authlevel";

    public const string UserId = "urn:altinn:userid";

    public const string PartyId = "urn:altinn:partyid";

    public const string RepresentingPartyId = "urn:altinn:representingpartyid";

    public const string UserName = "urn:altinn:username";

    public const string Developer = "urn:altinn:developer";

    public const string DeveloperToken = "urn:altinn:developertoken";

    public const string DeveloperTokenId = "urn:altinn:developertokenid";

    public const string AuthenticationMethod = "urn:altinn:authenticationmethod";

    public const string Org = "urn:altinn:org";

    public const string OrgNumber = "urn:altinn:orgNumber";
}
