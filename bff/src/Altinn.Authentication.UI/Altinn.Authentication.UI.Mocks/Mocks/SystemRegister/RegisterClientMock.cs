using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Platform.Register.Models;

namespace Altinn.Authentication.UI.Mocks.SystemRegister;
public class RegisterClientMock : IRegisterClient
{
    public Task<List<PartyName>> GetPartyNamesForOrganization(IEnumerable<string> orgNrs, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
