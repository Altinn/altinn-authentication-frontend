using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Platform.Register.Models;

namespace Altinn.Authentication.UI.Mocks.SystemRegister;
public class RegisterClientMock : IRegisterClient
{
    public Task<Party> GetPartyForOrganization(string organizationNumber)
    {
        throw new NotImplementedException();
    }
}
