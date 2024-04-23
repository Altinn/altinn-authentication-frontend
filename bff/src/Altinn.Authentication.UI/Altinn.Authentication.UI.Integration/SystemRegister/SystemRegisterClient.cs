using Altinn.Authentication.UI.Core.SystemRegister;

namespace Altinn.Authentication.UI.Integration.SystemRegister;

public class SystemRegisterClient : ISystemRegisterClient
{
    private static async Task<List<RegisteredSystemDTO>> MockTestHelper()
    {
        await Task.Delay(250);

        RegisteredSystemDTO regsys1 = new()
        {
            SystemTypeId = "4human_hr_system_2024_2",
            SystemVendor = "4Human",
            Description = "4Humans HR system 2024 versjon."
        };

        RegisteredSystemDTO regsys2 = new()
        {
            SystemTypeId = "din_lokale_regnskapspartner",
            SystemVendor = "Din Lokale Regnskapspartner AS",
            Description  = "Regnskap og Revisor tjenester"
        };

        RegisteredSystemDTO regsys3 = new()
        {
            SystemTypeId = "fiken_smabedrift",
            SystemVendor = "Fiken",
            Description =  "Fiken Småbedrift pakken"
        };

        RegisteredSystemDTO regsys4 = new()
        {
            SystemTypeId = "visma_mva_pakke",
            SystemVendor ="Visma",
            Description = "Visma MVA rapportering"

        };

        RegisteredSystemDTO regsys5 = new()
        {
            SystemTypeId = "visma_skatt_totalpakke",
            SystemVendor ="Visma",
            Description = "Visma Totalpakke for alle skatterapporterings behov"
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
