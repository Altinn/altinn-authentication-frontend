using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Platform.Profile.Models;

namespace Altinn.Authentication.UI.Integration.UserProfiles;

public class UserProfileClient : IUserProfileClient
{
    public async Task<UserProfile> GetUserProfile(int userid)
    {
        UserProfile user = new();
        return user;
    }
}
