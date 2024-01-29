namespace Altinn.Authentication.UI.Core.AppConfiguration;

public class KeyVaultSettings
{
    public KeyVaultSettings(string secretUri)
    {
        SecretUri = secretUri;
    }

    public string SecretUri { get; set; }
}
