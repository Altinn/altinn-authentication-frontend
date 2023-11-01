using Altinn.Authentication.UI.Core.SystemRegister;

namespace Altinn.Authentication.UI.Integration.SystemRegister;

public class SystemRegisterClient : ISystemRegisterClient
{
    private static async Task<List<RegisteredSystemDTO>> MockTestHelper()
    {
        await Task.Delay(250);

        RegisteredSystemDTO regsys1 = new()
        {
            SystemTypeId = "fancy_system_name",
            SystemVendor = "Fancy System Name",
            Description = "Vårt nye system som kan brukes til Alt."
        };

        RegisteredSystemDTO regsys2 = new()
        {
            SystemTypeId = "bra_system_navn",
            SystemVendor = "Bra System Navn",
            Description  =  "Rapporter naboens feilparkering i gata"
        };

        RegisteredSystemDTO regsys3 = new()
        {
            SystemTypeId = "decent_system_name",
            SystemVendor = "Decent System Name",
            Description =  "Rapporter helgeovertid"
        };

        RegisteredSystemDTO regsys4 = new()
        {
            SystemTypeId = "awesome_system_name",
            SystemVendor ="Awesome System Name",
            Description = "Tja, det virker ihvertfall"

        };

        RegisteredSystemDTO regsys5 = new()
        {
            SystemTypeId = "cool_system_name",
            SystemVendor ="Cool System Name",
            Description = "Enda bedre enn konkurrentene"
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
