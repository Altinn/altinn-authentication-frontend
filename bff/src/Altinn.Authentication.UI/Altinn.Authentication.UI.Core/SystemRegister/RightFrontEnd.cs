using Altinn.Authentication.UI.Core.Common.Rights;

namespace Altinn.Authentication.UI.Core.SystemRegister;


/// <summary>
/// Default Right on a Registered System, enriched with SystemOwner 
/// </summary>
public class RightFrontEnd
{
    /// <summary>
    /// The list of resources at the Service Provider which this Right is for.
    /// </summary>
    public List<AttributePair> Resource { get; set; } = [];

    /// <summary>
    /// The the full resource object of this Right.
    /// </summary>
    public ServiceResource? ServiceResource { get; set; }
}
