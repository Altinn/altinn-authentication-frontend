using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Platform.Profile.Models;

namespace Altinn.Authentication.UI.Mock.UserProfiles;

public class UserProfileClientMock : IUserProfileClient
{
    public async Task<UserProfile> GetUserProfile(int userid)
    {
        await Task.Delay(50);

        UserProfile user = new()
        {
            UserId = 20004938,
            Email = "1337@altinnstudiotestusers.com",
            PhoneNumber = "90001337",
            UserName = "Testur Testursson Jr",
            PartyId = 50019992,
            ExternalIdentity = "",
            Party = new Platform.Register.Models.Party
            {
                Name = "Test Organisasjon"
            },
            ProfileSettingPreference = new()
            {
                Language = "nb"
            },
            UserType = Platform.Profile.Enums.UserType.SSNIdentified

        };

        return user;
    }
}
