using Altinn.Platform.Profile.Models;

namespace Altinn.Authentication.UI.Core.UserProfiles;

public interface IUserProfileService
{
    /// <summary>
    /// Get the userprofile from the Platform Profile API
    /// </summary>
    /// <param name="userid"></param>
    /// <returns></returns>
    Task<UserProfile> GetUserProfile(int userid);
}
