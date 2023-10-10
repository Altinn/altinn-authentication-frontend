using System.Collections.Generic;
using System.Security.Claims;
using Altinn.Common.AccessTokenClient.Constants;
using AltinnCore.Authentication.Constants;

namespace Altinn.Authentication.UI.Mocks.Utils;

public static class PrincipalUtil
{

    public static string GetToken(int userId, int partyId, int authenticationLevel = 2)
    {
        List<Claim> claims = new();
        string issuer = "www.altinn.no";
        claims.Add(new Claim(AltinnCoreClaimTypes.UserId, userId.ToString(), ClaimValueTypes.String, issuer));
        claims.Add(new Claim(AltinnCoreClaimTypes.UserName, "UserOne", ClaimValueTypes.String, issuer));
        claims.Add(new Claim(AltinnCoreClaimTypes.PartyID, partyId.ToString(), ClaimValueTypes.String, issuer));
        claims.Add(new Claim(AltinnCoreClaimTypes.AuthenticateMethod, "Mock", ClaimValueTypes.String, issuer));
        claims.Add(new Claim(AltinnCoreClaimTypes.AuthenticationLevel, authenticationLevel.ToString(), issuer));

        ClaimsIdentity identity = new ClaimsIdentity("mock");
        identity.AddClaims(claims);
        ClaimsPrincipal principal = new ClaimsPrincipal(identity);
        string token = JwtTokenMock.GenerateToken(principal, new TimeSpan(1, 1, 1));

        return token;

    }

    public static string GetAccessToken(string issuer, string app)
    {
        List<Claim> claims = new()
        {
            new Claim(AccessTokenClaimTypes.App, app, ClaimValueTypes.String, issuer)
        };

        ClaimsIdentity identity = new ClaimsIdentity("mock");
        identity.AddClaims(claims);
        ClaimsPrincipal principal = new ClaimsPrincipal(identity);
        string token = JwtTokenMock.GenerateToken(principal, new TimeSpan(1, 1, 1), issuer);

        return token;
    }


    public static string GetAccessToken(string appId)
    {
        List<Claim> claims = new List<Claim>();
        string issuer = "www.altinn.no";

        if (!string.IsNullOrEmpty(appId))
        {
            claims.Add(new Claim("urn:altinn:app", appId, ClaimValueTypes.String, issuer));
        }

        ClaimsIdentity identity = new ClaimsIdentity("mock-org");
        identity.AddClaims(claims);
        ClaimsPrincipal principal = new ClaimsPrincipal(identity);
        string token = JwtTokenMock.GenerateToken(principal, new TimeSpan(1, 1, 1), issuer);

        return token;
    }
}
