namespace Altinn.Authentication.UI.Core.Common.Rights;

internal record DelegationCheckResult(bool CanDelegate, List<RightResponses>? RightResponses);
   
