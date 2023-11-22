using Altinn.Authentication.UI.Filters;
using Microsoft.AspNetCore.Mvc;
using Altinn.Authentication.UI.Core.SystemRegister;
using Microsoft.AspNetCore.Authorization;

namespace Altinn.Authentication.UI.Controllers;

[Route("authfront/api/v1/systemregister")]
[ApiController]
[AutoValidateAntiforgeryTokenIfAuthCookie]
public class SystemRegisterController : ControllerBase
{
    ISystemRegisterService _systemRegisterService;

    public SystemRegisterController(ISystemRegisterService systemRegisterService)
    {
        _systemRegisterService = systemRegisterService;
    }

    //[Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpGet]
    public async Task<ActionResult> GetListOfRegisteredSystems(CancellationToken cancellationToken = default)
    {
        List<RegisteredSystemDTO> lista = new();

        lista.AddRange( await _systemRegisterService.GetListRegSys(cancellationToken));

        return Ok(lista);
    }
}
