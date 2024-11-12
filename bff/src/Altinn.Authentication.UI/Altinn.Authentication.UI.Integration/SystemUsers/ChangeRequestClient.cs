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

public class ChangeRequestClient(
    HttpClient client,
    IOptions<PlatformSettings> optionsPlatformSetting,
    IHttpContextAccessor httpContext
    ) : IChangeRequestClient
{
    private readonly JsonSerializerOptions _jsonSerializerOptions = new() { PropertyNameCaseInsensitive = true };

    private string InitClient()
    {
        client.BaseAddress = new(optionsPlatformSetting.Value.ApiAuthenticationEndpoint!);
        client.DefaultRequestHeaders.Add(optionsPlatformSetting.Value.SubscriptionKeyHeaderName, optionsPlatformSetting.Value.SubscriptionKey);
        return JwtTokenUtil.GetTokenFromContext(httpContext.HttpContext!, optionsPlatformSetting.Value.JwtCookieName!)!;
    }

    public async Task<Result<ChangeRequest>> GetChangeRequest(int partyId, Guid requestId, CancellationToken cancellationToken)
    {        
        string endpoint = $"systemuser/changerequest/{partyId}/{requestId}";
        HttpResponseMessage res = await client.GetAsync(InitClient(), endpoint);

        if (res.IsSuccessStatusCode)
        {
            var val = JsonSerializer.Deserialize<ChangeRequest>(await res.Content.ReadAsStringAsync(cancellationToken), _jsonSerializerOptions);
            if (val is null)
            {
                return Problem.Generic_EndOfMethod;
            }

            return val;                
        }

        return Problem.Generic_EndOfMethod;
    }

    public async Task<Result<bool>> ApproveChangeRequest(int partyId, Guid requestId, CancellationToken cancellationToken)
    {
        string endpoint = $"systemuser/changerequest/{partyId}/{requestId}/approve";
        HttpResponseMessage res = await client.PostAsync(InitClient(), endpoint, null);

        if (res.IsSuccessStatusCode)
        {
            return true;
        }

        return Problem.Generic_EndOfMethod;
    }

    public async Task<Result<bool>> RejectChangeRequest(int partyId, Guid requestId, CancellationToken cancellationToken)
    {
        string endpoint = $"systemuser/changerequest/{partyId}/{requestId}/reject";
        HttpResponseMessage res = await client.PostAsync(InitClient(), endpoint, null);

        if (res.IsSuccessStatusCode)
        {
            return true;
        }

        return Problem.Generic_EndOfMethod;
    }
/*
    public async Task<Result<RedirectUrl>> GetChangeRequestRedirectUrl(Guid requestId, CancellationToken cancellationToken)
    {
        string endpoint = $"systemuser/changerequest/redirect/{requestId}";
        HttpResponseMessage res = await client.GetAsync(InitClient(), endpoint);

        if (res.IsSuccessStatusCode)
        {
            return JsonSerializer.Deserialize<RedirectUrl>(await res.Content.ReadAsStringAsync(cancellationToken), _jsonSerializerOptions);
        } 
        else 
        {
            AltinnProblemDetails? problemDetails = await res.Content.ReadFromJsonAsync<AltinnProblemDetails>(cancellationToken);
            if (problemDetails?.ErrorCode.ToString() is "AUTH-00010") 
            {
                return Problem.RequestNotFound;
            } 
            else 
            {
                return Problem.Generic_EndOfMethod;
            }
        }
    }
    */
}
