﻿using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;
using Altinn.Authentication.UI.Core.Common.Rights;
using Altinn.Authentication.UI.Core.SystemRegister;

namespace Altinn.Authentication.UI.Core.SystemUsers;

#nullable enable
/// <summary>
/// The model of the System User response given in the CRUD API in SystemUserController.cs
/// This model will be exchanged between this Authentication component, the PostGress db and the BFF for the Frontend.
/// The BFF will provide a tailored DTO to the Frontend.
/// The Altinn URN is: urn:altinn:systemuser:uuid
/// </summary>
[ExcludeFromCodeCoverage]
public class SystemUser
{
    /// <summary>
    /// GUID created by the "real" Authentication Component
    /// When the Frontend send a request for the creation of a new SystemUser the Id is null
    /// </summary>
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    /// <summary>
    /// The Title is by default the same as the System's Display Name
    /// </summary>
    [JsonPropertyName("integrationTitle")]
    public string IntegrationTitle { get; set; }

    /// <summary>
    /// Identifier for off the shelf systems, registered in the SystemRegister db.
    /// Should be human readable (instead of a GUID) and unique string without whitespace.                
    /// </summary>
    [JsonPropertyName("systemId")]
    public string SystemId { get; set; } = string.Empty;

    /// <summary>
    /// The underlying identifier for the System for persistance in the db.        
    /// </summary>
    [JsonPropertyName("systemInternalId")]
    public Guid? SystemInternalId { get; set; }

    /// <summary>
    /// The PartyID identifies the end-user Organisation, and is fetched from the login Context and
    /// user party serivces
    /// </summary>
    [JsonPropertyName("partyId")]
    public string PartyId { get; set; } = string.Empty;

    /// <summary>
    /// The Organisation Number for the end-user as it is stored in ER Registry        
    /// </summary>
    [JsonPropertyName("reporteeOrgNo")]
    public string ReporteeOrgNo { get; set; } = string.Empty;

    /// <summary>
    /// Nice to have for debugging and logging.
    /// </summary>
    [JsonPropertyName("created")]
    public System.DateTime Created { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// False by default, if a SystemUser is deleted in the API,
    /// it is marked as IsDeleted ("tombstoned") rather than actually deleted
    /// from the database. This is to avoid complications with cascade delete,
    /// and the need to maintain consistent logging, and possible compliance rules.
    /// </summary>
    [JsonPropertyName("isDeleted")]
    public bool IsDeleted { get; set; } = false;

    /// <summary>
    /// The name of the Supplier of the Product used in this Integration.
    /// In later phases, it will be possible to use non-supplier based Products, in which case the ClientId property should be filled out.
    /// </summary>
    [JsonPropertyName("supplierName")]
    public string SupplierName { get; set; } = string.Empty;

    /// <summary>
    /// The organization number for the Supplier of the Product 
    /// In later phases, it will be possible to use non-supplier based Products, in which case the ClientId property should be filled out.
    /// </summary>
    [JsonPropertyName("supplierOrgno")]
    public string SupplierOrgNo { get; set; } = string.Empty;

    /// <summary>
    /// List of rights for this systemuser
    /// </summary>
    [JsonPropertyName("rights")]
    public List<Right> Rights { get; set; } = [];

    /// <summary>
    /// List of resources information
    /// </summary>
    [JsonPropertyName("resources")]
    public List<ServiceResource> Resources { get; set; } = [];
}
