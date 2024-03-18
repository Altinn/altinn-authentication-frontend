using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Mocks.Utils;

namespace Altinn.Authentication.UI.Mocks.Authentication;

public class AuthenticationClientMock : IAuthenticationClient
{
    public AuthenticationClientMock()
    {
        
    }
    public async Task<string> RefreshToken()
    {
        return PrincipalUtil.GetAccessToken("sbl.authorization");
    }
}
