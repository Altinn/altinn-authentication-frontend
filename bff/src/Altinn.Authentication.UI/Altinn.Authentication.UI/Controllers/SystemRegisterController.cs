using Altinn.Authentication.UI.Filters;
using Microsoft.AspNetCore.Mvc;
using Altinn.Authentication.UI.Core.SystemRegisters;

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

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [HttpGet]
    public async Task<ActionResult> GetListOfRegisteredSystems()
    {
        var list = await _systemRegisterService.GetListRegSys();

        return Ok(list);
    }
}
