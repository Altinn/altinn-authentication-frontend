using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace Altinn.Authentication.UI.Mocks.Utils
{
    public static class JwtTokenMock
    {

        public static string GenerateToken(ClaimsPrincipal principal, TimeSpan tokenExpiry, string issuer = "UnitTest")
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(principal.Identity),
                Expires = DateTime.UtcNow.AddSeconds(tokenExpiry.TotalSeconds),
                SigningCredentials = GetSigningCredentials(issuer),
                Audience = "altinn.no",
                Issuer = issuer
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            string serializedToken = tokenHandler.WriteToken(token);
            return serializedToken;
        }

        private static SigningCredentials GetSigningCredentials(string issuer)
        {
            string certPath = "selfSignedTestCertificate.pfx";
            if(!issuer.Equals("sbl.authorization") && !issuer.Equals("www.altinn.no") && !issuer.Equals("UnitTest"))
            {
                certPath = $"{issuer}-org.pfx";
                X509Certificate2 certIssuer = new X509Certificate2(certPath);
                return new X509SigningCredentials(certIssuer, SecurityAlgorithms.RsaSha256);
            }

            X509Certificate2 cert = new X509Certificate2(certPath, "qwer1234");
            return new X509SigningCredentials(cert, SecurityAlgorithms.RsaSha256);
        }
    }
}
