using Altinn.Authentication.UI.Core.SystemUser;
using Altinn.Authentication.UI.Filters;
using Altinn.Authentication.UI.Models;
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

    ISystemUserClient _systemUserClient;

    /// <summary>
    /// Constructor for <see cref="SystemUserController"/>
    /// </summary>
    public SystemUserController(ISystemUserClient systemUserClient)
    {
        _systemUserClient = systemUserClient; 
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
        //var usr = MockTestHelper().Find(u => u.Id == id);

        return Ok();
    }

    // POST api/<SystemUserController>
    [Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpPost]
    public void Post([FromBody] SystemUserDescriptor newSystemUserDescriptor, CancellationToken cancellationToken = default)
    {
        _systemUserClient.PostNewSystemUserDescriptor(newSystemUserDescriptor, cancellationToken);
    }

    // PUT api/<SystemUserController>/5
    [Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpPut("{id}")]
    public void Put(Guid id, [FromBody] SystemUserDescriptor modifiedSystemUser, CancellationToken cancellationToken = default)
    {
        if (modifiedSystemUser.Title is not null) _systemUserClient.ChangeSystemUserTitle(modifiedSystemUser.Title, id, cancellationToken);
        if (modifiedSystemUser.Description is not null) _systemUserClient.ChangeSystemUserTitle(modifiedSystemUser.Description, id, cancellationToken);
    }

    // DELETE api/<SystemUserController>/5
    [Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpDelete("{id}")]
    public void Delete(Guid id, CancellationToken cancellationToken = default)
    {
        _systemUserClient.DeleteSystemUser(id, cancellationToken);
    }
}


