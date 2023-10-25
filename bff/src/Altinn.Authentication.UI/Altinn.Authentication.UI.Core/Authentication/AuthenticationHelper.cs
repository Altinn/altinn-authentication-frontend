using Altinn.Platform.Register.Models;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Altinn.Authentication.UI.Core.Authentication;

public static class AuthenticationHelper
{
    
    public static int GetUserId(HttpContext context) =>
        GetIntValueFromClaim(context, AltinnCoreClaimType.UserId);

    public static int GetUserAuthenticationLevel(HttpContext context) =>
         GetIntValueFromClaim(context, AltinnCoreClaimType.AuthenticationLevel);

    public static int GetUsersPartyId(HttpContext context) => 
        GetIntValueFromClaim(context, AltinnCoreClaimType.PartyId);

    private static int GetIntValueFromClaim(HttpContext context, string claimType)
    {
        int value = 0;

        if (context.User is not null)
        {
            foreach (Claim claim in context.User.Claims)
            {
                if (claim.Type.ToString().Equals(claimType))
                {
                    value = Convert.ToInt32(claim.Value);
                    return value;
                }
            }
        }
        return value;
    }
}
