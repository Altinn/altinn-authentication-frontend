using Altinn.Authentication.UI.Core.SystemRegister;

namespace Altinn.Authentication.UI.Integration.SystemRegister;

public class SystemRegisterClient : ISystemRegisterClient
{
    private static async Task<List<RegisteredSystemDTO>> MockTestHelper()
    {
        await Task.Delay(250);

        RegisteredSystemDTO regsys1 = new()
        {
            Id = Guid.NewGuid().ToString(),
            Navn = "Fancy System Name",
            Beskrivelse = "Vårt nye system som kan brukes til Alt."
        };

        RegisteredSystemDTO regsys2 = new()
        {
            Id = Guid.NewGuid().ToString(),
            Navn = "Bra System Navn",
            Beskrivelse = "Rapporter naboens feilparkering i gata"
        };

        RegisteredSystemDTO regsys3 = new()
        {
            Id = Guid.NewGuid().ToString(),
            Navn = "Decent System Name",
            Beskrivelse = "Rapporter helgeovertid"
        };

        RegisteredSystemDTO regsys4 = new()
        {
            Id = Guid.NewGuid().ToString(),
            Navn = "Awesome System Name",
            Beskrivelse = "Tja, det virker ihvertfall"

        };

        RegisteredSystemDTO regsys5 = new()
        {
            Id = Guid.NewGuid().ToString(),
            Navn = "Cool System Name",
            Beskrivelse = "Enda bedre enn konkurrentene"
        };

        List<RegisteredSystemDTO> theList = new()
        {
            regsys1,
            regsys2,
            regsys3,
            regsys4,
            regsys5
        };

        return theList;
    }

    public async Task<List<RegisteredSystemDTO>> GetListRegSys(CancellationToken cancellationToken)
    {
        return await MockTestHelper();
    }
}
