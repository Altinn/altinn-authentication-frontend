using Altinn.Authentication.UI.Core.AppConfiguration;
using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Filters;
using Altinn.Authentication.UI.Integration.Configuration;
using Altinn.Authorization.ProblemDetails;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

/// <summary>
/// API for the Frontend to fetch a Request then reject or approve it.
/// The adminstration ( CRUD API ) of Requests are done by Vendors directly towards the Authentication component.
/// </summary>

[Route("authfront/api/v1/systemuser/request")]
[ApiController]
[AutoValidateAntiforgeryTokenIfAuthCookie]
public class RequestController(
    IRequestService _requestService, IOptions<PlatformSettings> _platformSettings, IOptions<GeneralSettings> _generalSettings) : ControllerBase
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
    public IActionResult Logout([FromQuery] Guid requestGuid)
    {
        string redirectUrl = $"{_platformSettings.Value.ApiAuthenticationEndpoint}logout";

        CookieOptions cookieOptions = new()
        {
            Domain = _generalSettings.Value.HostName,
            HttpOnly = true,
            Secure = true,
            IsEssential = true,
            SameSite = SameSiteMode.Lax
        };

        // store cookie value for redirect
        HttpContext.Response.Cookies.Append("AltinnLogoutInfo", $"SystemuserRequestId={requestGuid}", cookieOptions);

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
        string? logoutInfoCookie = HttpContext.Request.Cookies["AltinnLogoutInfo"];
        if (string.IsNullOrWhiteSpace(logoutInfoCookie))
        {
            return BadRequest("AltinnLogoutInfo not set in cookies.");
        }

        string? requestId = logoutInfoCookie?.Split("SystemuserRequestId=").LastOrDefault();
        bool isValidGuid = Guid.TryParse(requestId, out Guid requestGuid);
        if (isValidGuid == false)
        {
            return BadRequest("Invalid SystemuserRequestId set in AltinnLogoutInfo");
        }

        Result<RedirectUrl> req = await _requestService.GetRedirectUrl(requestGuid, cancellationToken);
        if (req.IsProblem)
        {
            return req.Problem.ToActionResult();
        }
        
        // clean up cookie before redirecting to vendor
        HttpContext.Response.Cookies.Delete("AltinnLogoutInfo");
        return Redirect(req.Value.Url);
    }
}
