
using Altinn.Authorization.ABAC.Xacml.JsonProfile;
using Altinn.Common.PEP.Interfaces;
using System.Security.Claims;

namespace Altinn.Authentication.UI.Mocks.Mocks;

public class PdpPermitMock : IPDP
{
    public Task<XacmlJsonResponse> GetDecisionForRequest(XacmlJsonRequestRoot xacmlJsonRequest)
    {
        var response = new XacmlJsonResponse
        {
            Response = new List<XacmlJsonResult>(new[] {new XacmlJsonResult { Decision = "Permit"} })
        };

        return Task.FromResult(response);
    }

    public Task<bool> GetDecisionForUnvalidateRequest(XacmlJsonRequestRoot xacmlJsonRequest, ClaimsPrincipal user)
    {
        return Task.FromResult(true);
    }
}
