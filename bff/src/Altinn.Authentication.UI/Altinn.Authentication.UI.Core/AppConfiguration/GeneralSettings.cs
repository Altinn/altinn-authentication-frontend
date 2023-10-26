namespace Altinn.Authentication.UI.Core.AppConfiguration;

public class GeneralSettings
{
 
    public string? FrontendBaseUrl { get; set; }

    public string? HostName { get; set; }

    public bool DisableCsrfCheck { get; set; }

    public string? LanguageCookie { get; set; }

    public bool UseMockData { get; set; }
}
