using Altinn.Platform.Register.Models;

namespace Altinn.Authentication.UI.Core.SystemRegister;

/// <summary>
/// Interface for client wrapper for integration with the platform register API
/// </summary>
public interface IRegisterClient
{
    /// <summary>
    /// Looks up party information for an organization based on the organization number
    /// </summary>
    /// <param name="organizationNumber">The organization number</param>
    /// <returns>
    /// Party information
    /// </returns>
    Task<Party> GetPartyForOrganization(string organizationNumber, CancellationToken cancellationToken = default);
}
