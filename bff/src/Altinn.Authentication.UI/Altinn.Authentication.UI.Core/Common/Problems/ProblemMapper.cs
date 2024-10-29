using Altinn.Authorization.ProblemDetails;

namespace Altinn.Authentication.UI.Core.Common.Problems;
/// <summary>
/// Problem descriptors for the Authentication UI BFF.
/// </summary>
public static class ProblemMapper
{
    public static ProblemDescriptor MapToAuthUiError(string? authErrorCode)
    {
        return authErrorCode switch
        {
            "AUTH-00001" => Problem.Rights_NotFound_Or_NotDelegable,
            "AUTH-00002" => Problem.Rights_FailedToDelegate,
            "AUTH-00003" => Problem.SystemUser_FailedToCreate ,
            "AUTH-00004" => Problem.SystemUser_AlreadyExists,
            "AUTH-00014" => Problem.UnableToDoDelegationCheck,
            "AUTH-00015" => Problem.DelegationRightMissingRoleAccess,
            "AUTH-00016" => Problem.DelegationRightMissingDelegationAccess,
            "AUTH-00017" => Problem.DelegationRightMissingSrrRightAccess,
            "AUTH-00018" => Problem.DelegationRightInsufficientAuthenticationLevel,
            _ => Problem.Generic_EndOfMethod,
        };
    }
}