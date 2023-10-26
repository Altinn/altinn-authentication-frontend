using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Integration.Configuration;
using Altinn.Authentication.UI.Mocks.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;

namespace Altinn.Authentication.UI.Mock.Authentication;

public class AuthenticationClientMock : IAuthenticationClient
{
    public AuthenticationClientMock()
    {
        
    }
    public async Task<string> RefreshToken()
    {
        return PrincipalUtil.GetAccessToken("sbl-authorization");
    }
}
