using Microsoft.AspNetCore.Http;

namespace Altinn.Authentication.UI.Core.Common;

/// <summary>
/// Retrieves Cookie or Bearer token from the Context
/// </summary>
public static class JwtTokenUtil
{
    public static string? GetTokenFromContext(HttpContext context, string cookiename)
    {   
        //Get the cookie from the request
        string? token = context.Request.Cookies[cookiename];

        //If there is no cookie, search for a Bearer token
        if(token is null || token == string.Empty)
        {
            string? authorization = context.Request.Headers["Authorization"];
            if (authorization is null || authorization == string.Empty) 
            { 
                return string.Empty; 
            }

            if (authorization.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            {
                token = authorization["Bearer ".Length..].Trim();
            }
        }

        return token;
    }

    /// <summary>
    /// Update the http client with new Authorization Bearer token in request header
    /// </summary>
    /// <param name="client"></param>
    /// <param name="token"></param>
    public static void ReAddTokenToRequestHeader(HttpClient client, string token)
    {
        if (client.DefaultRequestHeaders.Contains("Authorization"))
        {
            client.DefaultRequestHeaders.Remove("Authorization");
        }
        client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
    }

}

