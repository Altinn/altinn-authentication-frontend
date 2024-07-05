using System.ComponentModel.DataAnnotations;


namespace Altinn.Authentication.UI.Core.Common.Rights;

/// <summary>
/// Model for performing a delegation of one or more rights to a recipient.
/// </summary>
public class DelegationRequest
{
    /// <summary>
    /// Gets or sets a set of Attribute Id and Attribute Value identfying the single person or entity receiving the delegation
    /// </summary>
    [Required]
    public List<AttributePair> To { get; set; } = [];

    /// <summary>
    /// Gets or sets a list of rights which is to be delegated to the recipient.
    /// </summary>
    [Required]
    public List<Right> Rights { get; set; } = [];
}
