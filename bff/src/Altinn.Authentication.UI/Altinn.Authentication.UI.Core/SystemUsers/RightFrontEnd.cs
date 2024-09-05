using Altinn.Authentication.UI.Core.Common.Rights;
using Altinn.Authentication.UI.Core.Resource;

namespace Altinn.Authentication.UI.Core.SystemUsers;


/// <summary>
/// Default Right on a Registered System, enriched with SystemOwner 
/// </summary>
public class RightFrontEnd
{
    /// <summary>
    /// The the full resource object of this Right.
    /// </summary>
    public DelegationResponseData DelegationResponseData { get; set; }

    public ServiceResource? ServiceResource { get; set; }
}
