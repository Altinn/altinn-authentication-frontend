using Altinn.Platform.Profile.Models;
using Microsoft.AspNetCore.Http;

namespace Altinn.Authentication.UI.Core.Common;

/// <summary>
/// Helper class for Authentication
/// </summary>
public static class ProfileHelper
{
    /// <summary>
    /// Gets the standard language code in ISO format
    /// </summary>
    /// <returns>the logged in users language on ISO format (no_nb, no_nn, en)</returns>
    public static string GetStandardLanguageCodeIsoStandard(UserProfile userProfile, HttpContext httpContext)
    {
        string languageCookieValue = GetAltinnPersistenceCookieValueIsoStandard(httpContext);

        if (!string.IsNullOrEmpty(languageCookieValue))
        {
            return languageCookieValue;
        }

        if (userProfile != null)
        {
            return (userProfile.ProfileSettingPreference?.Language) switch
            {
                "nn" => "no_nn",
                "nb" => "no_nb",
                "en" => "en",
                _ => "no_nb",
            };
        }

        return "no_nb";
    }

    private static string GetAltinnPersistenceCookieValueIsoStandard(HttpContext httpContext)
    {
        var cookieValue = httpContext.Request.Cookies["altinnPersistentContext"];

        if (cookieValue == null)
        {
            return string.Empty;
        }

        if (cookieValue.Contains("UL=1033"))
        {
            return "en";
        }

        if (cookieValue.Contains("UL=1044"))
        {
            return "no_nb";
        }

        if (cookieValue.Contains("UL=2068"))
        {
            return "no_nn";
        }

        return string.Empty;
    }
}
