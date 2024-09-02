﻿using System.Text.Json.Serialization;

namespace Altinn.Authentication.UI.Core.SystemUsers;

/// <summary>
/// When the Frontend POST a new SystemUser this is the DTO 
/// sent to the Authentication Component
/// </summary>
public class CreateSystemUserRequestToAuthComp
{
    [JsonPropertyName("partyId")]
    /// <summary>
    /// PartyId is the owning Legal Entity, whether an organization or a privat person
    /// </summary>
    public int? OwnedByPartyId { get; set; }

    /// <summary>
    /// The Organisation Number for the end-user as it is stored in ER Registry        
    /// </summary>
    [JsonPropertyName("reporteeOrgNo")]
    public string? ReporteeOrgNo { get; set; }

    /// <summary>
    /// The Title is set by the end-user in the Frontend, by default it is the same as the System's Display Name
    /// Even if this DTO allows null, the db field is of course still required   
    /// </summary>
    [JsonPropertyName("integrationTitle")]
    public string? IntegrationTitle { get; set; }

    /// <summary>
    /// For off the shelf systems.
    /// Should probably be human readable (instead of a GUID) but unique string without whitespace
    /// The "real" Authentication Component should validate that the SystemName is unique
    /// Retrieved from the SystemRegister, the full CRUD Api is in a different service
    /// </summary>
    [JsonPropertyName("systemId")]
    public string? SelectedSystemType { get; set; } 
}