using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Altinn.Authentication.UI.Controllers
{
    [Route("authfront/api/v1/profile")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        //private readonly IProfileClient _profileClient;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ProfileController(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ActionResult> GetUser()
        {
            return Ok();
        }
    }
}
