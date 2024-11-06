namespace Altinn.Authentication.UI.Core.Common.Rights;

/// <summary>
/// Retrieves Cookie or Bearer token from the Context
/// </summary>
public static class RightsHelper
{
    public static IEnumerable<string> GetResourceIdsFromRights(List<Right> rights)
    {
        return rights.SelectMany(x => x.Resource.Where(z => z.Id == "urn:altinn:resource").Select(y => y.Value));
    }
}
