using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Filters;
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
    IHttpContextAccessor _httpContextAccessor;

    /// <summary>
    /// Constructor for <see cref="SystemUserController"/>
    /// </summary>
    public SystemUserController(ISystemUserService systemUserService, IHttpContextAccessor httpContextAccessor)
    {
        _systemUserService = systemUserService;
        _httpContextAccessor = httpContextAccessor;
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

        var list = await _systemUserService.GetAllSystemUserDTOsForChosenUser(partyId, cancellationToken);

        return Ok(list);
    }

    [Authorize]
    [HttpGet("{guid}")]
    public async Task<ActionResult> GetSystemUserDetailsById(Guid guid, CancellationToken cancellationToken)
    {
        var (partyId, actionResult) = ResolvePartyId();
        if (partyId == 0) return actionResult;

        SystemUserDTO? details = await _systemUserService.GetSpecificSystemUserDTO(partyId, guid, cancellationToken);

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
    public async Task<ActionResult> UploadCertificate([FromForm] IFormFile file, [FromForm] string navn, [FromForm] string beskrivelse , CancellationToken cancellationToken = default)
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
    
    [Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpPost]
    public async Task<ActionResult> Post([FromBody] SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellationToken = default)
    {
        int partyId = AuthenticationHelper.GetUsersPartyId( _httpContextAccessor.HttpContext!);
        if (partyId.ToString() != newSystemUserDescriptor.OwnedByPartyId) return BadRequest();

        var usr = await _systemUserService.PostNewSystemUserDescriptor(partyId, newSystemUserDescriptor, cancellationToken);
        if (usr is not null)
        {
            SystemUserDTO dto = new() 
            {
                Id = usr.Id,
                IntegrationTitle = usr.Title,
                ClientId = usr.ClientId,
                Created = usr.Created,
                Description = usr.Description,
                OwnedByPartyId = usr.OwnedByPartyId,
                ProductName = usr.SystemType,
                ServiceOwner = "",
                SupplierName = "",
                SupplierOrgno = ""
            };
            return Ok(usr);
        }

        return NotFound();
    }

    [Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpPut("{id}")]
    public async void Put(Guid id, [FromBody] SystemUserDescriptor modifiedSystemUser, CancellationToken cancellationToken = default)
    {
        if (modifiedSystemUser.IntegrationTitle is not null) await _systemUserService.ChangeSystemUserTitle(modifiedSystemUser.IntegrationTitle, id, cancellationToken);      
        if (modifiedSystemUser.SelectedSystemType is not null) await _systemUserService.ChangeSystemUserProduct(modifiedSystemUser.SelectedSystemType, id, cancellationToken);
    }

    [Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id, CancellationToken cancellationToken = default)
    {
        int partyId = AuthenticationHelper.GetUsersPartyId(_httpContextAccessor.HttpContext!);
        var toBeDeleted = await _systemUserService.GetSpecificSystemUserDTO(partyId, id, cancellationToken);
        if (toBeDeleted == null) return NotFound();
        if (partyId.ToString() != toBeDeleted.OwnedByPartyId) return BadRequest();
        await _systemUserService.DeleteSystemUser(id, cancellationToken);
        return Ok(toBeDeleted.Id);
    }

    private (int partyId, ActionResult actionResult) ResolvePartyId()
    { 
        if (_httpContextAccessor.HttpContext is null) 
        {
            return (0, StatusCode(500));
        }

        int _userid = AuthenticationHelper.GetUserId(_httpContextAccessor.HttpContext);
        if (_userid == 0) {
            return (0, BadRequest("Userid not provided in the context."));            
        }

        int _partyId = AuthenticationHelper.GetUsersPartyId(_httpContextAccessor.HttpContext);
        if (_partyId == 0)
        {
            return (0, BadRequest("PartyId not provided in the context."));
        }

        return (_partyId, Ok(_partyId));
    }
}


