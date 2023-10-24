namespace Altinn.Authentication.UI.Core.Authentication;

public interface IAuthenticationClient
{
    Task<string> RefreshToken();
}
