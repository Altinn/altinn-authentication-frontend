using Altinn.Platform.Register.Models;

namespace Altinn.Authentication.UI.Core.UserProfiles;

public interface IPartyClient
{
    Task<Party> GetPartyFromReporteeListIfExists(int partyId);
}
