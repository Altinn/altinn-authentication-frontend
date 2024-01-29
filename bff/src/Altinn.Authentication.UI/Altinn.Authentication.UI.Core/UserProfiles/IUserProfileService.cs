using Altinn.Platform.Profile.Models;

namespace Altinn.Authentication.UI.Core.UserProfiles;

public interface IUserProfileService
{
    Task<UserProfile> GetUserProfile(int userid);
}
