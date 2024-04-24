
using Altinn.Platform.Profile.Models;

namespace Altinn.Authentication.UI.Core.UserProfiles;

/// <summary>
/// 
/// </summary>
public interface IUserProfileClient
{
    /// <summary>
    /// Retrieves the userprofile by id from the Platforms Profile API
    /// </summary>
    /// <param name="userid"></param>
    /// <returns></returns>
    public Task<UserProfile> GetUserProfile(int userid);

}
