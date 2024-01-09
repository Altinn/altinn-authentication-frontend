using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Net.Http.Headers;
//https://github.com/Altinn/altinn-authentication-frontend/issues/22 and 23

namespace Altinn.Authentication.UI.Controllers;

/// <summary>
/// This API performs basic CRUD operations for the System Users
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
    

    //[Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpGet("{id}")]
    public async Task<ActionResult> GetSystemUserListForLoggedInUser(int id, CancellationToken cancellationToken = default)
    {
        var list = await _systemUserService.GetAllSystemUserDTOsForChosenUser(id, cancellationToken);

        return Ok(list);
    }

    //https://brokul.dev/sending-files-and-additional-data-using-httpclient-in-net-core
    //POST api/<SystemUserController>/upload
    /// <summary>
    /// Used to upload a certificate for the System User
    /// </summary>
    /// <returns></returns>
    //[Authorize]
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
    /// <param name = "cancellationToken" ></ param >
    //[Authorize]
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

    
    //[Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpPost]
    public async Task<ActionResult> Post([FromBody] SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellationToken = default)
    {
        int partyId = AuthenticationHelper.GetUsersPartyId( _httpContextAccessor.HttpContext!);

        var usr = await _systemUserService.PostNewSystemUserDescriptor(partyId, newSystemUserDescriptor, cancellationToken);
        if (usr is not null)
        {
            return Ok(new { Id = usr?.Id?.ToString() });
        }

        return NotFound();
    }

    //[Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpPut("{id}")]
    public async void Put(Guid id, [FromBody] SystemUserDescriptor modifiedSystemUser, CancellationToken cancellationToken = default)
    {
        if (modifiedSystemUser.IntegrationTitle is not null) await _systemUserService.ChangeSystemUserTitle(modifiedSystemUser.IntegrationTitle, id, cancellationToken);      
        if (modifiedSystemUser.SelectedSystemType is not null) await _systemUserService.ChangeSystemUserProduct(modifiedSystemUser.SelectedSystemType, id, cancellationToken);
    }

    //[Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpDelete("{id}")]
    public void Delete(Guid id, CancellationToken cancellationToken = default)
    {
        _systemUserService.DeleteSystemUser(id, cancellationToken);
    }
}


