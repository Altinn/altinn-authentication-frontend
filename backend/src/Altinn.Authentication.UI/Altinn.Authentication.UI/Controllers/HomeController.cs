using Altinn.Authentication.UI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Altinn.Authentication.UI.Controllers
{
    [Route("authentication/")]
    [Route("authentication/ui")]
    [Route("authentication/ui/{*AnyValue}")]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
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