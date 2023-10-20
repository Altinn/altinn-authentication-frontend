namespace Altinn.Authentication.UI.Core.AppConfiguration;

public class GeneralSettings
{
    public GeneralSettings(string frontendBaseUrl, string hostName, bool disableCsrfCheck, string languageCookie, bool useMockData)
    {
        FrontendBaseUrl = frontendBaseUrl;
        HostName = hostName;
        DisableCsrfCheck = disableCsrfCheck;
        LanguageCookie = languageCookie;
        UseMockData = useMockData;
    }

    public string FrontendBaseUrl { get; set; }

    public string HostName { get; set; }

    public bool DisableCsrfCheck { get; set; }

    public string LanguageCookie { get; set; }

    public bool UseMockData { get; set; }
}
