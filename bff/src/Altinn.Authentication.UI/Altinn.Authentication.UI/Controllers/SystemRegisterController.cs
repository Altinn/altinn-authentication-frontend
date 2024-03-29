﻿using Altinn.Authentication.UI.Filters;
using Microsoft.AspNetCore.Mvc;
using Altinn.Authentication.UI.Core.SystemRegister;
using Microsoft.AspNetCore.Authorization;

namespace Altinn.Authentication.UI.Controllers;

[Route("authfront/api/v1/systemregister")]
[ApiController]
[AutoValidateAntiforgeryTokenIfAuthCookie]
public class SystemRegisterController : ControllerBase
{
    private readonly ISystemRegisterService _systemRegisterService;

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

        lista.AddRange(await _systemRegisterService.GetListRegSys(cancellationToken));

        return Ok(lista);
    }

    [HttpGet("product/{productId}")]
    public async Task<ActionResult> GetDefaultRightsForProductName(string productId, CancellationToken cancellationToken = default)    
    {
        List<DefaultRightsDTO> lista = new();
        DefaultRightsDTO l1 = new() { Right = "Mva Registrering", ServiceProvider = "Skatteetaten" };
        DefaultRightsDTO l2 = new() { Right = "Lønns Rapportering", ServiceProvider = "Skatteetaten" };
        DefaultRightsDTO l3 = new() { Right = "Lakselus Rapportering", ServiceProvider = "Mattilsynet" };
        lista.Add(l1);
        lista.Add(l2);
        lista.Add(l3);
        return Ok(lista);
    }
}
