﻿using Microsoft.AspNetCore.Authorization;
using Altinn.Platform.Profile.Models;
using Microsoft.AspNetCore.Mvc;
using Altinn.Authentication.UI.Models;

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

    /// <summary>
    /// Initializes a new instance of the <see cref="ProfileController"/> class
    /// </summary>
    public ProfileController(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
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

        UserProfile user = new()
        {
            UserId = 20004938,
            Email = "1337@altinnstudiotestusers.com",
            PhoneNumber = "90001337",
            UserName = "Testur Testursson Jr",
            PartyId = 50019992,
            ExternalIdentity = "",
            Party = new Platform.Register.Models.Party 
            {
                Name = "Test Organisasjon"
            },
            ProfileSettingPreference = new() 
            {
                Language = "nb"
            },
            UserType = Platform.Profile.Enums.UserType.SSNIdentified             

        };

        UserNameAndOrganizatioNameDTO userDTO = new() 
        { 
            UserName = user.UserName,
            OrganizationName = user.Party.Name
        };

        return Ok(userDTO);
    }
}


