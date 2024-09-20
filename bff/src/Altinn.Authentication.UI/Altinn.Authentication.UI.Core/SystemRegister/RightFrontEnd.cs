using Altinn.Authentication.UI.Core.Common.Rights;

namespace Altinn.Authentication.UI.Core.SystemRegister;


/// <summary>
/// Default Right on a Registered System, enriched with SystemOwner 
/// </summary>
public class RightFrontEnd : Right
{
    /// <summary>
    /// The the full resource object of this Right.
    /// </summary>
    public ServiceResource? ServiceResource { get; set; }
}
