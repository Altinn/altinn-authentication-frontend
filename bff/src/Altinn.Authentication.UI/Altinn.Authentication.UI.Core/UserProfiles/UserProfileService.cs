using Altinn.Platform.Profile.Models;
using Microsoft.Extensions.Logging;

namespace Altinn.Authentication.UI.Core.UserProfiles;

public class UserProfileService : IUserProfileService
{
    private readonly ILogger _logger;
    private readonly IUserProfileClient _profileClient;

    public async Task<UserProfile> GetUserProfile(int userid)
    {
        UserProfile userProfile = await _profileClient.GetUserProfile(userid);
        return userProfile;
    }
}
