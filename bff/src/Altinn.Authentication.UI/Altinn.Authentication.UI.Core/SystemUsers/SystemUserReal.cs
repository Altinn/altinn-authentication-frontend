﻿namespace Altinn.Authentication.UI.Core.SystemUsers;

/// <summary>
/// The central concept 
/// The end-user that creates a systemUser.
/// One is created for every systemType the end-user wants to integrate with / delegate rights to
/// It should only be possible to create one systemuser pr end-user and systemtype.
/// 
/// In this Backend-for-Frontend we denote it as SystemUserReal because it should have the
/// same datastructure as the SystemUser has in the "Real" Authentication Component.
/// When the "Real" Authentication Component implements SystemUser, this model should be exposed in a nuget.
/// </summary>
public sealed class SystemUserReal

{
    /// <summary>
    /// GUID created by the "real" Authentication Component
    /// </summary>
    public string? Id { get; set; }

    /// <summary>
    /// The Title and Description are strings set by the end-user in the Frontend.
    /// </summary>
    public string? Title { get; set; }
    public string? Description { get; set; }

    /// <summary>
    /// For off the shelf systems.
    /// Should probably be human readable (instead of a GUID) but unique string without whitespace
    /// The "real" Authentication Component should validate that the SystemName is unique
    /// Retrieved from the SystemRegister, the full CRUD Api is in a different service
    /// </summary>
    public string? SystemType { get; set; }

    /// <summary>
    /// The OwnedBy and ControlledBy identifies the end-user, and is fetched from the login Context and
    /// user profile serivces
    /// </summary>
    public string? OwnedBy { get; set; }
    public string? ControlledBy { get; set; }

    /// <summary>
    /// For self-made systems, not delivered in the first Phase of the Project, and therefore not in the DTO
    /// </summary>
    public string? ClientId { get; set; }

    /// <summary>
    /// Nice to have for debugging and logging.
    /// </summary>
    public string? Created { get; set; }

}
