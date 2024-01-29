using Altinn.Platform.Register.Models;

namespace Altinn.Authentication.UI.Core.UserProfiles;

public interface IPartyService
{
    /// <summary>
    /// Retrieves the party if it exists in the authenticated user's list
    /// </summary>
    /// <param name="partyId"></param>
    /// <returns></returns>
    Task<Party> GetPartyFromReporteeListIfExists(int partyId);
}
