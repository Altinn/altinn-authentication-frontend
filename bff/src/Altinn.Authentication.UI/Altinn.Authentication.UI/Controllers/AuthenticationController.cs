using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Altinn.Authentication.UI.Filters;
using Altinn.Authentication.UI.Core.Authentication;
using Microsoft.Extensions.Options;
using Altinn.Authentication.UI.Core.AppConfiguration;
using Altinn.Authentication.UI.Integration.Configuration;
using Altinn.Authentication.UI.Integration.Authentication;
using Microsoft.IdentityModel.Tokens;

namespace Altinn.Authentication.UI.Controllers;

[ApiController]
[AutoValidateAntiforgeryTokenIfAuthCookie] 
public class AuthenticationController : ControllerBase
{
    private readonly IAntiforgery _antiforgery;
    private readonly ILogger _logger;
    private readonly PlatformSettings _platformSettings;
    //private readonly GeneralSettings _generalSettings;
    private readonly IAuthenticationClient _authenticationClient;

    public AuthenticationController(
        IAuthenticationClient authenticationClient,
        ILogger<AuthenticationController> logger,
        //IOptions<GeneralSettings> generalSettings,
        IOptions<PlatformSettings> platformSettings,
        IAntiforgery antiforgery)
    {
        _antiforgery = antiforgery;
        _logger = logger;
        _platformSettings = platformSettings.Value;
        //_generalSettings = generalSettings.Value;
        _authenticationClient = authenticationClient;

    }

    //[Authorize]
    [HttpGet("authfront/api/v1/authentication/refresh")]
    public async Task<IActionResult> Refresh()
    {
        try
        {
            string token = await _authenticationClient.RefreshToken();
            if (string.IsNullOrWhiteSpace(token)) return BadRequest();

            CookieOptions runtimeCookieSetting = new()
            {
                Domain = "localhost",//_generalSettings.HostName,
                HttpOnly = true,
                Secure = true,
                IsEssential = true,
                SameSite = SameSiteMode.Lax
            };

            //string? tokenName = _platformSettings.JwtCookieName;
            string tokenName = "XSRF-TOKEN";
            if (string.IsNullOrWhiteSpace(tokenName)) return BadRequest();
            HttpContext.Response.Cookies.Append(tokenName, token, runtimeCookieSetting);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Refresh failed to return an updated token.");
            return StatusCode(500);
        }

        //AntiforgeryTokenSet tokens = _antiforgery.GetAndStoreTokens(HttpContext);
        //if (tokens.RequestToken is null) return NotFound();
        //HttpContext.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, new CookieOptions
        //{
        //    Domain = "localhost",
        //    HttpOnly = true,
        //    Secure = true,
        //    IsEssential = true,
        //    SameSite = SameSiteMode.Lax
        //});

        return Ok();

    }
}
