namespace Altinn.Authentication.UI.Core.AppConfiguration;

public class AppEnvironment
{

    /// <summary>
    /// Gets an environment variable by its key if it exists otherwise use fallback value
    /// </summary>
    /// <param name="key"></param>
    /// <param name="fallback"></param>
    /// <returns></returns>
    public static string GetVariable(string key, string fallback = "")
    {
        var value = Environment.GetEnvironmentVariable(key);

        if(value is not null && value.Length > 0)
        {
            return value;
        }

        return fallback;
    }
}
