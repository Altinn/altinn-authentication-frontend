using Altinn.Authentication.UI.Core.Authentication;

namespace Altinn.Authentication.UI.Mocks.Mocks;

public class AuthenticationNullRefreshMock : IAuthenticationClient
{
    public async Task<string> RefreshToken()
    {
        return null;
    }
}
