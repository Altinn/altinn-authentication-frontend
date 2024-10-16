using Altinn.Authentication.UI.Core.AppConfiguration;
using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Filters;
using Altinn.Authorization.ProblemDetails;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;

/// <summary>
/// API for the Frontend to fetch a Request then reject or approve it.
/// The adminstration ( CRUD API ) of Requests are done by Vendors directly towards the Authentication component.
/// </summary>

[Route("authfront/api/v1/systemuser/request")]
[ApiController]
[AutoValidateAntiforgeryTokenIfAuthCookie]
public class RequestController(
    IRequestService _requestService, IOptions<GeneralSettings> _generalSettings) : ControllerBase
{       
    /// <summary>
    /// Gets a VendorRequest by Id
    /// </summary>
    /// <returns></returns>
    [Authorize]
    [HttpGet("{requestId}")]
    public async Task<ActionResult> GetRequestByPartyIdAndRequestId(Guid requestId, CancellationToken cancellationToken = default)
    {
        int partyId = AuthenticationHelper.GetRepresentingPartyId(HttpContext);
        if (partyId == 0)
        {
            return BadRequest("PartyId not provided in the context.");
        }

        Result<VendorRequest> req = await _requestService.GetVendorRequest(partyId, requestId, cancellationToken);
        if (req.IsProblem)
        {
            return req.Problem.ToActionResult();
        }
        
        return Ok(req.Value);
    }

    /// <summary>
    /// Approve a VendorRequest by Id
    /// </summary>
    /// <returns></returns>
    [Authorize]
    [HttpPost("{requestId}/approve")]
    public async Task<ActionResult> ApproveRequest(Guid requestId, CancellationToken cancellationToken = default)
    {
        int partyId = AuthenticationHelper.GetRepresentingPartyId(HttpContext);
        if (partyId == 0)
        {
            return BadRequest("PartyId not provided in the context.");
        }

        Result<bool> req = await _requestService.ApproveRequest(partyId, requestId, cancellationToken);
        if (req.IsProblem)
        {
            return req.Problem.ToActionResult();
        }

        return Ok(req.Value);
    }

    /// <summary>
    /// Reject a VendorRequest by Id
    /// </summary>
    /// <returns></returns>
    [Authorize]
    [HttpPost("{requestId}/reject")]
    public async Task<ActionResult> RejectRequest(Guid requestId, CancellationToken cancellationToken = default)
    {
        int partyId = AuthenticationHelper.GetRepresentingPartyId(HttpContext);
        if (partyId == 0)
        {
            return BadRequest("PartyId not provided in the context.");
        }

        Result<bool> req = await _requestService.RejectRequest(partyId, requestId, cancellationToken);
        if (req.IsProblem)
        {
            return req.Problem.ToActionResult();
        }

        return Ok(req.Value);
    }
    
    /// <summary>
    /// Logout
    /// </summary>
    /// <returns></returns>
    [Authorize]
    [HttpGet("logout")]
    public async Task<ActionResult> Logout([FromQuery] Guid requestId, CancellationToken cancellationToken = default)
    {
        string redirectUrl = $"{_generalSettings.Value.FrontendBaseUrl}/authfront/api/v1/systemuser/request/redirect";
        // store cookie value for redirect
        HttpContext.Response.Cookies.Append("AltinnRequestId", requestId.ToString());

        // call logout service with redirectUrl as param
        // TODO

        int partyId = AuthenticationHelper.GetRepresentingPartyId(HttpContext);
        if (partyId == 0)
        {
            return BadRequest("PartyId not provided in the context.");
        }

        Result<VendorRequest> req = await _requestService.GetVendorRequest(partyId, requestId, cancellationToken);
        HttpContext.Response.Cookies.Append("AltinnRedirectUrl", req.Value.RedirectUrl);
        
        // end test code

        // redirect to url returned from logout service
        return Redirect(redirectUrl);
    }

    /// <summary>
    /// Redirect after logout
    /// </summary>
    /// <returns></returns>
    [HttpGet("redirect")]
    public async Task<ActionResult> RedirectToVendor(CancellationToken cancellationToken = default)
    {
        string? requestId = HttpContext.Request.Cookies["AltinnRequestId"];
        
        if (string.IsNullOrWhiteSpace(requestId))
        {
            return BadRequest("AltinnRequestId not set in cookies.");
        }
        /*
        Guid id = new(requestId);
        Result<string> req = await _requestService.GetRedirectUrl(id, cancellationToken);
        if (req.IsProblem)
        {
            return req.Problem.ToActionResult();
        }
        */
        string? url = HttpContext.Request.Cookies["AltinnRedirectUrl"];

        HttpContext.Response.Cookies.Delete("AltinnRequestId");
        return Redirect(url);
    }
}
