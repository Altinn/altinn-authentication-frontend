﻿using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Integration.AccessToken;
using Altinn.Authentication.UI.Integration.Configuration;
using Altinn.Authorization.ProblemDetails;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Altinn.Authentication.UI.Core.Extensions;
using System.Text.Json;
using Altinn.Authentication.UI.Core.Common.Problems;

namespace Altinn.Authentication.UI.Integration.SystemUsers;

public class RequestClient(
    HttpClient client,
    IOptions<PlatformSettings> optionsPlatformSetting,
    IHttpContextAccessor httpContext
    ) : IRequestClient
{    

    private string InitClient()
    {
        client.BaseAddress = new(optionsPlatformSetting.Value.ApiAuthenticationEndpoint!);
        client.DefaultRequestHeaders.Add(optionsPlatformSetting.Value.SubscriptionKeyHeaderName, optionsPlatformSetting.Value.SubscriptionKey);
        return JwtTokenUtil.GetTokenFromContext(httpContext.HttpContext!, optionsPlatformSetting.Value.JwtCookieName!)!;
    }

    public async Task<Result<VendorRequest>> GetVendorRequest(int partyId, Guid requestId)
    {        
        string endpoint = $"systemuser/request/{partyId}/{requestId}";
        HttpResponseMessage res = await client.GetAsync(InitClient(), endpoint);

        if (res.IsSuccessStatusCode)
        {
            var val = JsonSerializer.Deserialize<VendorRequest>(await res.Content.ReadAsStringAsync());
            if (val is null)
            {
                return Problem.Generic_EndOfMethod;
            }

            return val;                
        }

        return Problem.Generic_EndOfMethod;
    }
}
