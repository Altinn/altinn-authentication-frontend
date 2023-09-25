using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Altinn.Platform.Register.Models;

namespace Altinn.Authentication.UI.Controllers
{
    [ApiController]
    public class LookupController : ControllerBase
    {
        [HttpGet]
        //[Authorize]
        [Route("authfront/api/v1/lookup/reportee/{partyId}")]
        public async Task<ActionResult<Party>> GetPartyFromReportee(int partyId)
        {
            Party party = new();

            return Ok(party);
        }

    }
}
