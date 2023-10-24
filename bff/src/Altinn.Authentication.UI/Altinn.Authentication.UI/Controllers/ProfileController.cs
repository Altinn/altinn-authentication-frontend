using Microsoft.AspNetCore.Authorization;
using Altinn.Platform.Profile.Models;
using Microsoft.AspNetCore.Mvc;
using Altinn.Authentication.UI.Models;
using System.Runtime.CompilerServices;
using Altinn.Authentication.UI.Core.UserProfiles;

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
    //[Authorize] 
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpGet("user")]
    public async Task<ActionResult> GetUser()
    {

        UserProfile user = await _userProfileService.GetUserProfile(1);

        UserNameAndOrganizatioNameDTO userDTO = new() 
        { 
            UserName = user.UserName,
            OrganizationName = user.Party.Name
        };

        return Ok(userDTO);
    }
}


