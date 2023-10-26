using Altinn.Authentication.UI.Core.SystemRegister;

namespace Altinn.Authentication.UI.Mock.SystemRegister;

public class SystemRegisterClientMock : ISystemRegisterClient
{
    private static async Task<List<RegisteredSystemDTO>> MockTestHelper()
    {
        await Task.Delay(250);

        RegisteredSystemDTO regsys1 = new()
        {
            Id = "facny_system_name_v1",
            Navn = "Fancy System Name",
            Beskrivelse = "Vårt nye system som kan brukes til Alt."
        };

        RegisteredSystemDTO regsys2 = new()
        {
            Id = "bra_system_navn_2023",
            Navn = "Bra System Navn",
            Beskrivelse = "Rapporter naboens feilparkering i gata"
        };

        RegisteredSystemDTO regsys3 = new()
        {
            Id = "decent_system_name",
            Navn = "Decent System Name",
            Beskrivelse = "Rapporter helgeovertid"
        };

        RegisteredSystemDTO regsys4 = new()
        {
            Id = "awesome_system_name_121",
            Navn = "Awesome System Name",
            Beskrivelse = "Tja, det virker ihvertfall"

        };

        RegisteredSystemDTO regsys5 = new()
        {
            Id = "cool_system_name_forest",
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
