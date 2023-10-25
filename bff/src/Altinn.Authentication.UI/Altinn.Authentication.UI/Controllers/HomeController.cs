using Altinn.Authentication.UI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.Extensions.Options;
using System.Web;
using Altinn.Platform.Profile.Models;
using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.UserProfiles;

namespace Altinn.Authentication.UI.Controllers;

[Route("authfront/")]
[Route("authfront/ui")]
[Route("authfront/ui/{*AnyValue}")]
public class HomeController : Controller
{
    //private readonly ILogger<HomeController> _logger;
    private readonly IAntiforgery _antiforgery;
    private readonly IWebHostEnvironment _env;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IUserProfileService _profileService;

    /// <summary>
    ///     Initializes a new instance of the <see cref="HomeController" /> class.
    /// </summary>
    /// <param name="frontEndEntrypoints">Configuration of frontend entry points</param>
    /// <param name="antiforgery">the anti forgery service</param>
    /// <param name="platformSettings">settings related to the platform</param>
    /// <param name="env">the current environment</param>
    /// <param name="profileService">service implementation for user profile</param>
    /// <param name="httpContextAccessor">http context</param>
    /// <param name="generalSettings">general settings</param>
    public HomeController(
        IUserProfileService profileService,
        IAntiforgery antiforgery,
        IWebHostEnvironment env,
        IHttpContextAccessor httpContextAccessor)
        //IOptions<PlatformSettings> platformSettings,
        //IOptions<FrontEndEntryPointOptions> frontendEntrypointOptions)
        //IOptions<GeneralSettings> generalSettings)
        //ILogger<HomeController> logger)
    {
        //_logger = logger;
        _antiforgery = antiforgery;
        _env = env;
        _httpContextAccessor = httpContextAccessor;
        _profileService = profileService;
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

        //string goToUrl = HttpUtility.UrlEncode($"{_generalSettings.FrontendBaseUrl}{Request.Path}");
        string goToUrl = "https://localhost:7170/authfront/ui/home";
        string authApiEndpoint = "http://localhost:5101/authentication/api/v1/openid";
        string redirectUrl = authApiEndpoint + "?goto=" + goToUrl;
        //string redirectUrl = $"{_platformSettings.ApiAuthenticationEndpoint}authentication?goto={goToUrl}";
        return Redirect(redirectUrl);

    }

    private async Task SetLanguageCookie()        
    {
        int userId = 0;
        var context = _httpContextAccessor.HttpContext;
        if (context is not null)
        {
            userId = AuthenticationHelper.GetUserId(context);
        }
        //int userId = 007;
        UserProfile userProfile = await _profileService.GetUserProfile(userId);
        _ = _antiforgery.GetAndStoreTokens(HttpContext);
        string language = userProfile.ProfileSettingPreference.Language;
        //string language = "no_nb";

        HttpContext.Response.Cookies.Append("il8next", language, new CookieOptions
        {   //Cookie should now be readable by javascript
            HttpOnly = false
        });
    }

    private async Task<bool> ShouldShowAppView()
    {
        if (User.Identity is null) return false;
        if (User.Identity.IsAuthenticated)
        {
            await SetLanguageCookie();
            return true;
        }

        return false;
    }
}