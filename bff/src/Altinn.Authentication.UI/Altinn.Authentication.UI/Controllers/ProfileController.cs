using Microsoft.AspNetCore.Authorization;
using Altinn.Platform.Profile.Models;
using Microsoft.AspNetCore.Mvc;
using Altinn.Authentication.UI.Models;
using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Authentication.UI.Core.Authentication;

namespace Altinn.Authentication.UI.Controllers;

/// <summary>
/// The <see cref="ProfileController"/> provides the API endpoints related to persons.
/// </summary>
[Route("authfront/api/v1/profile")]
[ApiController]
public class ProfileController : ControllerBase
{
    //private readonly IProfileClient _profileClient;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IUserProfileService _userProfileService;
    /// <summary>
    /// Initializes a new instance of the <see cref="ProfileController"/> class
    /// </summary>
    public ProfileController(
        IHttpContextAccessor httpContextAccessor,
        IUserProfileService userProfileService
        )
    {
        _httpContextAccessor = httpContextAccessor;
        _userProfileService = userProfileService;
    }

    /// <summary>
    /// Method that returns the user information about the user that is logged in
    /// <param name = "UserDTO">The UserProfile as a DTO for the Frontend</param>
    /// </summary>
    [Authorize] 
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpGet("user")]
    public async Task<ActionResult> GetUser()
    {
        UserNameAndOrganizatioNameDTO? userDTO;

        var context = _httpContextAccessor.HttpContext;
        if (context is null) return StatusCode(500);

        int userid = AuthenticationHelper.GetUserId(context);
            if(userid == 0 )return BadRequest("Userid not provided in the context.");

        try
        {
            UserProfile user = await _userProfileService.GetUserProfile(userid);
            if (user is null) return NotFound();
            
            userDTO = new()
            {
                UserName = user.UserName,
                OrganizationName = user.Party.Name
            };

        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }

        

        return Ok(userDTO);
    }
}


