namespace Altinn.Authentication.UI.Core.SystemUsers;

/// <summary>
/// Used in the Frontend or API to present the SystemUser
/// </summary>
public sealed record SystemUserDTO
{
    /// <summary>
    /// Unique Id implemented as Guid
    /// </summary>
    public string? Id { get; set; }

    /// <summary>
    /// A name chosen by the Consumer at the time of creating the Integration
    /// Should not be used in any automatic systems and are only used by the 
    /// consumer for convenience in the Frontend UI
    /// </summary>
    public string? IntegrationTitle { get; set; }

    /// <summary>
    /// A convenience field used by the Supplier of the Product to
    /// describe what it's purpose is for. 
    /// Such as Tax system, HR system, etc...
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// 
    /// The name chosen by the Supplier of the Product.
    /// Is important and should be unique, should be an
    /// URL safe string, with only lowercase letters - and dash.
    /// </summary>
    public string? ProductName { get; set; }

    /// <summary>
    /// The name of the Supplier that manufactured the Product
    /// </summary>
    public string? SupplierName { get; set; }

    /// <summary>
    /// The legal number (Orgno) of the Supplier that manufactured the Product
    /// </summary>
    public string? SupplierOrgno { get; set; }

    /// <summary>
    /// The legal number (Orgno) of the Consumer that integrated with the Product
    /// </summary>
    public string? OwnedByPartyId { get; set; }      

    /// <summary>
    /// The created date, used to sort the Frontend UI if the Consumer has many
    /// integrations.
    /// </summary>
    public string? Created { get; set; }

    /// <summary>
    /// A unique Id maintained by Maskinporten, which is a one to one mapping to the 
    /// Integration Id we maintain.
    /// </summary>
    public string? ClientId { get; set; }

    /// <summary>
    /// The Service that the Product delivers data to,
    /// such as Skatteetaten, NAV, etc...
    /// </summary>
    public string? ServiceOwner { get; set; }
}
