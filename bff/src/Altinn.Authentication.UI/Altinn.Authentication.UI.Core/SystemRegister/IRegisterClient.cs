using Altinn.Platform.Register.Models;

namespace Altinn.Authentication.UI.Core.SystemRegister;

/// <summary>
/// Interface for client wrapper for integration with the platform register API
/// </summary>
public interface IRegisterClient
{
    /// <summary>
    /// Looks up party names of organizations based on organization numbers
    /// </summary>
    /// <param name="orgNrs">List of organization numbers</param>
    /// <returns>
    /// Party information
    /// </returns>
    Task<List<PartyName>> GetPartyNamesForOrganization(IEnumerable<string> orgNrs, CancellationToken cancellationToken = default);
}
