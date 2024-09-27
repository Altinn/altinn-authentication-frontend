using Altinn.Authentication.UI.Filters;
using Microsoft.AspNetCore.Mvc;
using Altinn.Authentication.UI.Core.SystemRegister;
using Microsoft.AspNetCore.Authorization;

namespace Altinn.Authentication.UI.Controllers;

/// <summary>
/// Responsible for presenting the list of registered system to UI. 
/// </summary>
[Route("authfront/api/v1/systemregister")]
[ApiController] 
[AutoValidateAntiforgeryTokenIfAuthCookie]
public class SystemRegisterController : ControllerBase
{
    private readonly ISystemRegisterService _systemRegisterService;

    /// <summary>
    /// Initializes a new instance of the <see cref="SystemRegisterController"/> class.
    /// </summary>
    /// <param name="systemRegisterService"></param>
    public SystemRegisterController(ISystemRegisterService systemRegisterService)
    {
        _systemRegisterService = systemRegisterService;
    }

    /// <summary>
    /// Get list of registered systems.
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpGet]
    public async Task<ActionResult> GetListOfRegisteredSystems(CancellationToken cancellationToken = default)
    {
        List<RegisterSystemResponse> lista = [.. await _systemRegisterService.GetListRegSys(cancellationToken)];

        return Ok(lista);
    }

    /// <summary>
    /// Get rights for a single system
    /// </summary>
    /// <param name="systemId"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [Authorize]
    [HttpGet("rights/{systemId}")]
    public async Task<ActionResult> GetSystemRights(string systemId, CancellationToken cancellationToken)
    {
        List<ServiceResource> rights = await _systemRegisterService.GetSystemRights(systemId, cancellationToken);

        return Ok(rights);
    }

}
