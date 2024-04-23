namespace Altinn.Authentication.UI.Core.UserProfiles;

public interface IAccessTokenProvider
{
    /// <summary>
    /// Gets the access token.
    /// </summary>
    /// <returns>An access token as a printable string</returns>
    public Task<string> GetAccessToken();
}
