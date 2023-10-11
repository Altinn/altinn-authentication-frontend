using Altinn.Authentication.UI.Core.SystemUser;
using Altinn.Authentication.UI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
//https://github.com/Altinn/altinn-authentication-frontend/issues/22

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
    [Authorize] 
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SystemUserDTO>>> GetSystemUserList()
    {

        //var list = MockTestHelper();

        return Ok();
    }

    // GET api/<SystemUserController>/5
    [Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpGet("{id}")]
    public async Task<ActionResult> GetSystemUser(string id, CancellationToken cancellationToken = default)
    {
        var list = await _systemUserService.GetAllSystemUserDTOsForChosenUser(Guid.NewGuid(), cancellationToken);

        return Ok(list);
    }

    // POST api/<SystemUserController>
    [Authorize]
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
    [Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpDelete("{id}")]
    public void Delete(Guid id, CancellationToken cancellationToken = default)
    {
        _systemUserService.DeleteSystemUser(id, cancellationToken);
    }
}


