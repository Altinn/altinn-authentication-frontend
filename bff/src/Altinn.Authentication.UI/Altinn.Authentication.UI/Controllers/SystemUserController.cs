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

    /// <summary>
    /// Constructor for <see cref="SystemUserController"/>
    /// </summary>
    public SystemUserController(ISystemUserService systemUserService)
    {
        _systemUserService = systemUserService; 
    }
    
    // GET: api/<SystemUserController>
    //[Authorize] 
    //[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    //[HttpGet]
    //public async Task<ActionResult<IEnumerable<SystemUserDTO>>> GetSystemUserList()
    //{

    //    //var list = MockTestHelper();

    //    return Ok();
    //}

    // GET api/<SystemUserController>/5
    //[Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpGet("{id}")]
    public async Task<ActionResult> GetSystemUserListForLogedInUser(string id, CancellationToken cancellationToken = default)
    {
        var list = await _systemUserService.GetAllSystemUserDTOsForChosenUser(Guid.NewGuid(), cancellationToken);

        return Ok(list);
    }

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
    [Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpPost("upload")]
    public async Task<ActionResult> UploadCertificate(IFormFile file, CancellationToken cancellationToken = default)
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
        Debug.WriteLine(responseString);
        response.Dispose();

        return Ok();
    }

    // POST api/<SystemUserController>
    //[Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpPost]
    public void Post([FromBody] SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellationToken = default)
    {
        _systemUserService.PostNewSystemUserDescriptor(newSystemUserDescriptor, cancellationToken);
    }

    // PUT api/<SystemUserController>/5
    [Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpPut("{id}")]
    public async void Put(Guid id, [FromBody] SystemUserDescriptor modifiedSystemUser, CancellationToken cancellationToken = default)
    {
        if (modifiedSystemUser.Title is not null) await _systemUserService.ChangeSystemUserTitle(modifiedSystemUser.Title, id, cancellationToken);
        if (modifiedSystemUser.Description is not null) await _systemUserService.ChangeSystemUserTitle(modifiedSystemUser.Description, id, cancellationToken);
    }

    // DELETE api/<SystemUserController>/5
    //[Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpDelete("{id}")]
    public void Delete(Guid id, CancellationToken cancellationToken = default)
    {
        _systemUserService.DeleteSystemUser(id, cancellationToken);
    }
}


