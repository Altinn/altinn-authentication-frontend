using Microsoft.AspNetCore.Authorization;
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

        //[Authorize] //TODO: må fikse
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        [HttpGet("user")]
        public async Task<ActionResult> GetUser()
        {
            var user = new
            {
                UserId = 20004938,
                UserName = "JarleErKul",
                PhoneNumber = "90001337",
                Email = "1337@altinnstudiotestusers.com",
                PartyId = 50019992,
                Party = new
                {
                    UserType = 1,
                    ProfileSettingPreference = new
                    {
                        Language = "nb"
                    }
                }
            };

            return Ok(user);
        }
    }
}
