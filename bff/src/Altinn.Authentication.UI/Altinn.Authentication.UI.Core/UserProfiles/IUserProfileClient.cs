
using Altinn.Platform.Profile.Models;

namespace Altinn.Authentication.UI.Core.UserProfiles;

public interface IUserProfileClient
{
    public Task<UserProfile> GetUserProfile(int userid);

}
