using Altinn.Authentication.UI.Core.Common.Models;
using Altinn.Platform.Register.Models;

namespace Altinn.Authentication.UI.Core.UserProfiles;

public interface IPartyClient
{
    Task<AuthorizedPartyExternal> GetPartyFromReporteeListIfExists(int partyId);
}
