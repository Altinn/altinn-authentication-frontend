namespace Altinn.Authentication.UI.Core.AppConfiguration;

public class ClientSettings
{
    public ClientSettings() { }

    public ClientSettings(string issuer, string app, string certificateName)
    {
        Issuer = issuer;
        App = app;
        CertificateName = certificateName;
    }

    public string Issuer { get; set; }

    public string App { get; set; }

    public string CertificateName { get; set; }
}
