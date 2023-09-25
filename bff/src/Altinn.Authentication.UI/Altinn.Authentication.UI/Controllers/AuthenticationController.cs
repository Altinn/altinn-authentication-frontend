using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Altinn.Authentication.UI.Controllers
{
    [ApiController]
    [AutoValidateAntiforgeryToken] //TODO: bruke Filteret til AM, prøver uten først så Torgeir får sin Mocked BFF
    public class AuthenticationController : ControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AuthenticationController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        //[Authorize]
        //[HttpGet("authfront/api/v1/authentication/refresh")]        //the correct URL, at least for now, it is likely to change prior to Production, pending input from Skatt and NAV
        [HttpGet("accessmanagement/api/v1/authentication/refresh")]   //this is the URL the js tries to hit now, must be changed
        public async Task<IActionResult> Refresh()
        {
            AntiforgeryTokenSet tokens = _antiforgery.GetAndStoreTokens(HttpContext);
            HttpContext.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, new CookieOptions
            {
                Domain = "localhost",
                HttpOnly = true,
                Secure = true,
                IsEssential = true,
                SameSite = SameSiteMode.Lax
            });

            return Ok();

        }
    }
}
