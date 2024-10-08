﻿using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Filters;
using Altinn.Authorization.ProblemDetails;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace Altinn.Authentication.UI.Controllers;

/// <summary>
/// API for System User Integrations.
/// Each System User integrates a Registered System with a Service for a given Party.
/// Registered System could be Vendor's Products, such as Accounting systems etc,
/// the Services could be Skatteetaten, NAV etc ...
/// 
/// The Party could be businesses using accounting software, with delegated authority
/// to integrate with the Service.
/// 
/// The System User could also denote Single Rights or Rights Packages delegated to it
/// from the Party; for the purpose of integrating the Product with the Service.
/// </summary>
[Route("authfront/api/v1/systemuser")]
[ApiController]
[AutoValidateAntiforgeryTokenIfAuthCookie]
public class SystemUserController : ControllerBase
{
    ISystemUserService _systemUserService;

    /// <summary>
    /// Constructor for <see cref="SystemUserController"/>
    /// </summary>
    public SystemUserController(ISystemUserService systemUserService)
    {
        _systemUserService = systemUserService;
    }
    
    /// <summary>
    /// Used by the party
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpGet]
    public async Task<ActionResult> GetSystemUserListForLoggedInUser(CancellationToken cancellationToken = default)
    {
        var (partyId, actionResult) = ResolvePartyId();

        if (partyId == 0) return actionResult;               

        var list = await _systemUserService.GetAllSystemUsersForParty(partyId, cancellationToken);

        return Ok(list);
    }

    [Authorize]
    [HttpGet("{guid}")]
    public async Task<ActionResult> GetSystemUserDetailsById(Guid guid, CancellationToken cancellationToken)
    {
        var (partyId, actionResult) = ResolvePartyId();
        
        if (partyId == 0) return actionResult;

        SystemUser? details = await _systemUserService.GetSpecificSystemUserDTO(partyId, guid, cancellationToken);

        return Ok(details);
    }
    
    /// <summary>
    /// Used to upload a certificate for the System User
    /// </summary>
    /// <returns></returns>
    [Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpPost("uploaddisk")]
    public async Task<ActionResult> UploadFileToDisk(IFormFile file, CancellationToken cancellationToken = default)
    {        

        var fileName = file.FileName;
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", fileName);
        var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream, cancellationToken);

        stream.Close();
        stream.Dispose();
        
        return Ok();
    }

    /// <summary>
    /// Endpoint for uploading a certificate for the System User
    /// </summary>
    /// <param name = "cancellationToken" ></param >
    [Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpPost("uploadjwk")]
    public async Task<ActionResult> UploadCertificate(IFormFile file, [FromForm] string navn, [FromForm] string beskrivelse , CancellationToken cancellationToken = default)
    {
        using var form = new MultipartFormDataContent();
        using var streamContent = new StreamContent(file.OpenReadStream());
        using var fileContent = new ByteArrayContent(await streamContent.ReadAsByteArrayAsync(cancellationToken));
        fileContent.Headers.ContentType = MediaTypeHeaderValue.Parse(file.ContentType);
        form.Add(fileContent, "file", file.FileName);

        using var client = new HttpClient();
        var response = await client.PostAsync("http://localhost:5006/authfront/api/v1/systemuser/uploaddisk", form, cancellationToken);
        response.EnsureSuccessStatusCode();
        var responseString = await response.Content.ReadAsStringAsync(cancellationToken);
        response.Dispose();

        return Ok();
    }
    
    /// <summary>
    /// Endpoint for creating a new System User for the choosen reportee.The reportee is taken from the AltinnPartyId cookie 
    /// 
    /// Expects backend in Authenticaiton and in Access Management to perform authorization ch
    /// </summary>
    /// <param name="newSystemUserDescriptor">The required params for a system to be created</param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    //[Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpPost]
    public async Task<ActionResult> Post([FromBody] CreateSystemUserRequestGUI newSystemUserDescriptor, CancellationToken cancellationToken = default)
    {
        // Get the partyId from the context (Altinn Part Coook)
        int partyId = AuthenticationHelper.GetRepresentingPartyId( HttpContext);        

        CreateSystemUserRequestToAuthComp newSystemUser = new() 
        {
            IntegrationTitle = newSystemUserDescriptor.IntegrationTitle,
            SelectedSystemType = newSystemUserDescriptor.SelectedSystemType,
            OwnedByPartyId = partyId,            
        };    

        Result<SystemUser> systemUser = await _systemUserService.CreateSystemUser(partyId, newSystemUser, cancellationToken);
        
        if (systemUser.IsProblem){return systemUser.Problem.ToActionResult();}

        return Ok(systemUser.Value);
    }

    [Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpPut("{id}")]
    public async void Put(Guid id, [FromBody] CreateSystemUserRequestGUI modifiedSystemUser, CancellationToken cancellationToken = default)
    {
        if (modifiedSystemUser.IntegrationTitle is not null) await _systemUserService.ChangeSystemUserTitle(modifiedSystemUser.IntegrationTitle, id, cancellationToken);      
        if (modifiedSystemUser.SelectedSystemType is not null) await _systemUserService.ChangeSystemUserProduct(modifiedSystemUser.SelectedSystemType, id, cancellationToken);
    }

    [Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id, CancellationToken cancellationToken = default)
    {
        // Get the partyId from the context (Altinn Part Coook)
        int partyId = AuthenticationHelper.GetRepresentingPartyId(HttpContext);
        var toBeDeleted = await _systemUserService.GetSpecificSystemUserDTO(partyId, id, cancellationToken);
        if (toBeDeleted == null) return NotFound();
        if (partyId.ToString() != toBeDeleted.PartyId) return BadRequest();
        Result<bool> result = await _systemUserService.DeleteSystemUser(partyId, id, cancellationToken);
        if (result.IsProblem)
        {
            return result.Problem.ToActionResult();
        }
        return NoContent();
    }

    private (int partyId, ActionResult actionResult) ResolvePartyId()
    { 
        if (HttpContext is null) 
        {
            return (0, StatusCode(500));
        }

        int _partyId = AuthenticationHelper.GetRepresentingPartyId(HttpContext);
        if (_partyId == 0)
        {
            return (0, BadRequest("PartyId not provided in the context."));
        }

        return (_partyId, Ok(_partyId));
    }
}


