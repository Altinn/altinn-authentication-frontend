using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Altinn.Authentication.UI.Core.Authentication;

public static class AuthenticationHelper
{
    /// <summary>
    /// Retrieves the user id as an int from the http context user claims
    /// </summary>
    /// <param name="httpContext"></param>
    /// <returns></returns>
    public static int GetUserId(HttpContext httpContext)
    {
        int userId = 0;

        if(httpContext.User is not null)
        {
            foreach (Claim claim in httpContext.User.Claims)
            {
                if (claim.Type.Equals(AltinnCoreClaimType.UserId))
                {
                    userId = Convert.ToInt32(claim.Value);
                }
            }
        }

        return userId;
    }

    /// <summary>
    /// Retrieves the authenticationlevel from the httpcontext user claims
    /// </summary>
    /// <param name="httpContext"></param>
    /// <returns></returns>
    public static int GetUserAuthenticationLevel (HttpContext httpContext)
    {
        int authenticationLevel = 0;

        if(httpContext.User is not null)
        {
            foreach(Claim claim in httpContext.User.Claims)
            {
                if (claim.Type.Equals(AltinnCoreClaimType.AuthenticationLevel))
                {
                    authenticationLevel = Convert.ToInt32(claim.Value);
                }
            }
        }
        return authenticationLevel;
    }

    public static int GetUsersPartyId(HttpContext context)
    {
        int partyId = 0;

        if(context.User is not null)
        {
            foreach (Claim claim in context.User.Claims)
            {
                if (claim.Type.Equals(AltinnCoreClaimType.PartyId))
                {
                    partyId = Convert.ToInt32(claim.Value);
                }

            }
        }

        return partyId;
    }
}
