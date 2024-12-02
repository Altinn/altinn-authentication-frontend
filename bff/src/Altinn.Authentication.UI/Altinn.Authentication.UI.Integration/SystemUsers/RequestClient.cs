using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Integration.Configuration;
using Altinn.Authorization.ProblemDetails;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Altinn.Authentication.UI.Core.Extensions;
using System.Text.Json;
using Altinn.Authentication.UI.Core.Common.Problems;
using System.Net.Http.Json;

namespace Altinn.Authentication.UI.Integration.SystemUsers;

public class RequestClient(
    HttpClient client,
    IOptions<PlatformSettings> optionsPlatformSetting,
    IHttpContextAccessor httpContext
    ) : IRequestClient
{
    private readonly JsonSerializerOptions _jsonSerializerOptions = new() { PropertyNameCaseInsensitive = true };

    private string InitClient()
    {
        client.BaseAddress = new(optionsPlatformSetting.Value.ApiAuthenticationEndpoint!);
        client.DefaultRequestHeaders.Add(optionsPlatformSetting.Value.SubscriptionKeyHeaderName, optionsPlatformSetting.Value.SubscriptionKey);
        return JwtTokenUtil.GetTokenFromContext(httpContext.HttpContext!, optionsPlatformSetting.Value.JwtCookieName!)!;
    }

    public async Task<Result<VendorRequest>> GetVendorRequest(int partyId, Guid requestId, CancellationToken cancellationToken)
    {        
        string endpoint = $"systemuser/request/{partyId}/{requestId}";
        HttpResponseMessage res = await client.GetAsync(InitClient(), endpoint);

        if (res.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return Problem.RequestNotFound;
        } 

        if (res.IsSuccessStatusCode)
        {
            var val = JsonSerializer.Deserialize<VendorRequest>(await res.Content.ReadAsStringAsync(cancellationToken), _jsonSerializerOptions);
            if (val is null)
            {
                return Problem.Generic_EndOfMethod;
            }

            return val;                
        }

        return Problem.Generic_EndOfMethod;
    }

    public async Task<Result<bool>> ApproveRequest(int partyId, Guid requestId, CancellationToken cancellationToken)
    {
        string endpoint = $"systemuser/request/{partyId}/{requestId}/approve";
        HttpResponseMessage res = await client.PostAsync(InitClient(), endpoint, null);
        return await HandleResponse(res, cancellationToken);
    }

    public async Task<Result<bool>> RejectRequest(int partyId, Guid requestId, CancellationToken cancellationToken)
    {
        string endpoint = $"systemuser/request/{partyId}/{requestId}/reject";
        HttpResponseMessage res = await client.PostAsync(InitClient(), endpoint, null);
        return await HandleResponse(res, cancellationToken);
    }

    private async Task<Result<bool>> HandleResponse(HttpResponseMessage res, CancellationToken cancellationToken)
    {

        if (res.IsSuccessStatusCode)
        {
            return true;
        }

        try
        {
            AltinnProblemDetails? problemDetails = await res.Content.ReadFromJsonAsync<AltinnProblemDetails>(cancellationToken);
            return ProblemMapper.MapToAuthUiError(problemDetails?.ErrorCode.ToString());
        }
        catch 
        {
            return Problem.Generic_EndOfMethod;
        }
    }
}
