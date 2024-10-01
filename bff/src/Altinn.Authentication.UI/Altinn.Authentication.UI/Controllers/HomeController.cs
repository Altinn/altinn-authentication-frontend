using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.Extensions.Options;
using System.Web;
using Altinn.Platform.Profile.Models;
using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Authentication.UI.Core.AppConfiguration;
using Altinn.Authentication.UI.Integration.Configuration;
using Altinn.Authentication.UI.Core.Common;

namespace Altinn.Authentication.UI.Controllers;

/// <summary>
/// The Home controller
/// </summary>
[Route("authfront/")]
[Route("authfront/ui")]
[Route("authfront/ui/{*AnyValue}")]
public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IAntiforgery _antiforgery;
    private readonly IWebHostEnvironment _env;
    private readonly IUserProfileService _profileService;
    private readonly GeneralSettings _generalSettings;
    private readonly PlatformSettings _platformSettings;

    /// <summary>
    ///     Initializes a new instance of the <see cref="HomeController" /> class.
    /// </summary>
    /// <param name="antiforgery">the anti forgery service</param>
    /// <param name="platformSettings">settings related to the platform</param>
    /// <param name="env">the current environment</param>
    /// <param name="profileService">service implementation for user profile</param>
    /// <param name="generalSettings">general settings</param>
    /// <param name="logger">logger</param>
    public HomeController(
        IUserProfileService profileService,
        IAntiforgery antiforgery,
        IWebHostEnvironment env,
        IOptions<PlatformSettings> platformSettings,
        IOptions<GeneralSettings> generalSettings,
        ILogger<HomeController> logger)
    {
        _logger = logger;
        _antiforgery = antiforgery;
        _env = env;
        _profileService = profileService;
        _generalSettings = generalSettings.Value;
        _platformSettings = platformSettings.Value;
    }


    /// <summary>
    ///     Gets the app frontend view for Authentication
    /// </summary>
    /// <returns>View result</returns>
    [HttpGet]
    public async Task<IActionResult> Index()
    {

        AntiforgeryTokenSet tokens = _antiforgery.GetAndStoreTokens(HttpContext);
        if (_env.IsDevelopment())
        {
            if (tokens.RequestToken is null) { return NotFound(); }
            HttpContext.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, new CookieOptions
            {
                HttpOnly = false
            });
        }
        else
        {
            if (tokens.RequestToken is null) { return NotFound(); }
            HttpContext.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, new CookieOptions
            {
                Secure = true,
                HttpOnly = false
            });
        }

        if (await ShouldShowAppView())
        {
            return View();
        }

        string goToUrl = HttpUtility.UrlEncode($"{_generalSettings.FrontendBaseUrl}{Request.Path}{Request.QueryString}");
        string redirectUrl = $"{_platformSettings.ApiAuthenticationEndpoint}authentication?goto={goToUrl}";
        return Redirect(redirectUrl);

    }

    private async Task SetLanguageCookie()        
    {
        int userId = AuthenticationHelper.GetUserId(HttpContext);
    
        UserProfile userProfile = await _profileService.GetUserProfile(userId);
        _antiforgery.GetAndStoreTokens(HttpContext);
        string language = ProfileHelper.GetStandardLanguageCodeIsoStandard(userProfile, HttpContext);

        HttpContext.Response.Cookies.Append("i18next", language, new CookieOptions
        {   //Cookie should now be readable by javascript
            HttpOnly = false
        });
    }

    private async Task<bool> ShouldShowAppView()
    {
        if (Request.Path.StartsWithSegments("/authfront/ui/auth/redirect")) {
            return true;
        }
        if (User.Identity is null) return false;
        if (User.Identity.IsAuthenticated)
        {
            await SetLanguageCookie();
            return true;
        }

        return false;
    }
}