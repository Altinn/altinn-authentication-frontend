﻿using Altinn.Authorization.ProblemDetails;
using System.Net;

namespace Altinn.Authentication.UI.Core.Common.Problems;
/// <summary>
/// Problem descriptors for the Authentication UI BFF.
/// </summary>
public static class Problem
{
    private static readonly ProblemDescriptorFactory _factory
        = ProblemDescriptorFactory.New("ATUI");

    /// <summary>
    /// Gets a <see cref="ProblemDescriptor"/>.
    /// </summary>
    public static ProblemDescriptor Reportee_Orgno_NotFound{ get; }
        = _factory.Create(0, HttpStatusCode.BadRequest, "Can't resolve the Organisation Number from the logged in Reportee PartyId.");

    /// <summary>
    /// Gets a <see cref="ProblemDescriptor"/>.
    /// </summary>
    public static ProblemDescriptor Rights_NotFound_Or_NotDelegable { get; }
        = _factory.Create(1, HttpStatusCode.BadRequest, "One or more Right not found or not delegable.");

    /// <summary>
    /// Gets a <see cref="ProblemDescriptor"/>.
    /// </summary>
    public static ProblemDescriptor Rights_FailedToDelegate { get; }
        = _factory.Create(2, HttpStatusCode.BadRequest, "The Delegation failed.");


    /// <summary>
    /// Gets a <see cref="ProblemDescriptor"/>.
    /// </summary>
    public static ProblemDescriptor SystemUser_FailedToCreate { get; }
        = _factory.Create(3, HttpStatusCode.BadRequest, "Failed to create the SystemUser.");

    /// <summary>
    /// Gets a <see cref="ProblemDescriptor"/>.
    /// </summary>
    public static ProblemDescriptor SystemUser_AlreadyExists { get; }
        = _factory.Create(4, HttpStatusCode.BadRequest, "Failed to create new SystemUser, existing SystemUser tied to the given System-Id.");

    /// <summary>
    /// Gets a <see cref="ProblemDescriptor"/>.
    /// </summary>
    public static ProblemDescriptor Generic_EndOfMethod { get; }
        = _factory.Create(5, HttpStatusCode.BadRequest, "Default error at the end of logic chain. Not supposed to appear.");

}