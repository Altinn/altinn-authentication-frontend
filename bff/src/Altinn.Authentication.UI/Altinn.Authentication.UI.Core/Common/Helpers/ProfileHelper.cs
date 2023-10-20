using Altinn.Platform.Profile.Models;
namespace Altinn.Authentication.UI.Core.Common;

/// <summary>
/// Helper class for Authentication
/// </summary>
public static class ProfileHelper
{

    /// <summary>
    /// Gets the users prefered language from the profile
    /// </summary>
    /// <param name="userProfile"></param>
    /// <returns></returns>
    public static string GetLanguageCodeForUser(UserProfile userProfile)
    {
        if(userProfile is null)
        {
            return "nb";
        }

        return userProfile.ProfileSettingPreference.Language;
    }

    /// <summary>
    /// Gets the standard language code based on userprofile preference
    /// </summary>
    /// <param name="userProfile"></param>
    /// <returns></returns>
    public static string GetStandardLanguageCodeForUser(UserProfile userProfile)
    {
        if (userProfile is null)
        {
            return "no_nb";
        }

        return (userProfile.ProfileSettingPreference?.Language) switch
        {
            "nn" => "no_nn",
            "nb" => "no_nb",
            "en" => "en",
            _ => "no_nb",
        };
    }
}
