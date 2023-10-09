using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Altinn.Authentication.UI.Filters;

namespace Altinn.Authentication.UI.Controllers
{
    [ApiController]
    [AutoValidateAntiforgeryTokenIfAuthCookie] 
    public class AuthenticationController : ControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AuthenticationController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        //[Authorize]
        [HttpGet("authfront/api/v1/authentication/refresh")]        //TODO: it is likely to change prior to Production, pending input from Skatt and NAV
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
