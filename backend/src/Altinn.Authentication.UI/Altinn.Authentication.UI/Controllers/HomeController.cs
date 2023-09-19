using Altinn.Authentication.UI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.Extensions.Options;
using System.Web;

namespace Altinn.Authentication.UI.Controllers
{
    [Route("authentication/")]
    [Route("authentication/ui")]
    [Route("authentication/ui/{*AnyValue}")]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IAntiforgery _antiforgery;
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _httpContextAccessor;

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
            //IProfileService profileService,
            IAntiforgery antiforgery,
            IWebHostEnvironment env,
            IHttpContextAccessor httpContextAccessor)
            //IOptions<PlatformSettings> platformSettings,
            //IOptions<FrontEndEntryPointOptions> frontendEntrypointOptions,
            //IOptions<GeneralSettings> generalSettings,
            //ILogger<HomeController> logger)
        {
            //_logger = logger;
            _antiforgery = antiforgery;
            _env = env;
            _httpContextAccessor = httpContextAccessor;
            //_profileService = profileService;
        }


        /// <summary>
        ///     Gets the app frontend view for Authentication
        /// </summary>
        /// <returns>View result</returns>
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            if(await ShouldShowAppView())
            {
                return View();
            }


            //string goToUrl = HttpUtility.UrlEncode($"{_generalSettings.FrontendBaseUrl}{Request.Path}");
            //string redirectUrl = $"{_platformSettings.ApiAuthenticationEndpoint}authentication?goto={goToUrl}";
            //return Redirect(redirectUrl);

            return View();
        }

        private async Task SetLanguageCookie()        
        {
            //int userId = AuthenticationHelper.GetUserId();            
        }

        private async Task<bool> ShouldShowAppView()
        {
            if (User.Identity.IsAuthenticated)
            {
                await SetLanguageCookie();
                return true;
            }

            return false;
        }
    }
}