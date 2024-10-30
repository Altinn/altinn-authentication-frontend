namespace Altinn.Authentication.UI.Core.AppConfiguration;

public class CacheConfig
{
    /// <summary>
    /// Gets or sets the cache timeout (in minutes) for the lookup of party information
    /// </summary>
    public int PartyCacheTimeout { get; set; }

    /// <summary>
    /// Gets or sets the cache timeout (in minutes) for lookup of resource owners
    /// </summary>
    public int ResourceOwnerCacheTimeout { get; set; }     
}
