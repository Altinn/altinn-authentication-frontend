using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Altinn.Authentication.UI.Models;
using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.Common.Models;

namespace Altinn.Authentication.UI.Controllers;

/// <summary>
/// The <see cref="ProfileController"/> provides the API endpoints related to persons.
/// </summary>
[Route("authfront/api/v1/profile")]
[ApiController]
public class ProfileController : ControllerBase
{    
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IPartyService _partyService;

    /// <summary>
    /// Initializes a new instance of the <see cref="ProfileController"/> class
    /// </summary>
    public ProfileController(
        IHttpContextAccessor httpContextAccessor,
        IPartyService partyService
        )
    {
        _httpContextAccessor = httpContextAccessor;
        _partyService = partyService;
    }

    /// <summary>
    /// Method that returns the user information about the user that is logged in.
    /// The method consumes the UserProfile and Party services
    /// </summary>
    /// <returns>The UserProfile as a DTO for the Frontend</returns>    
    [Authorize] 
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpGet("user")]
    public async Task<ActionResult> GetUser()
    {
        ProfileInfo? profileInfo = new();

        var context = _httpContextAccessor.HttpContext;
        if (context is null) return StatusCode(500);

        int loggedInPartyId = AuthenticationHelper.GetUsersPartyId(context);
        if (loggedInPartyId == 0) return BadRequest("PartyId not provided in the context.");
        PartyExternal loggedinParty = await _partyService.GetParty(loggedInPartyId);

        int representingPartyId = AuthenticationHelper.GetRepresentingPartyId(context);
        if (representingPartyId == 0) return BadRequest("PartyId not provided in the context.");
        AuthorizedPartyExternal representingParty = await _partyService.GetPartyFromReporteeListIfExists(representingPartyId);

        try
        {
            profileInfo.LoggedInPersonName = loggedinParty.Name;
            profileInfo.RepresentingPartyName = representingParty.Name;
            profileInfo.CanCreateSystemUser = 
                representingParty.AuthorizedRoles.Any(role => role == "DAGL" || role == "HADM" || role == "ADMAI") && 
                representingParty.Type == AuthorizedPartyTypeExternal.Organization;
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
                
        return Ok(profileInfo);
    }
}


