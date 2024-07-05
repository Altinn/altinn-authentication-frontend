using Altinn.Authentication.UI.Core.Common.Rights;

namespace Altinn.Authentication.UI.Core.SystemRegister;


/// <summary>
/// Default Right on a Registered System, enriched with SystemOwner 
/// </summary>
public class RightFrontEnd
{
    /// <summary>
    /// For instance: Read, Write, Sign
    /// </summary>                
    public string? Action { get; set; }

    /// <summary>
    /// The list of resources at the Service Provider which this Right is for.
    /// </summary>
    public List<AttributePair> Resource { get; set; } = [];

    /// <summary>
    /// The identifier for the Service Provider of the Resource.        
    /// </summary>
    public string ServiceProvider { get;  } = "Skatteetaten";
}

