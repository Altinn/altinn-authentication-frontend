using Altinn.Authentication.UI.Core.SystemRegister;

namespace Altinn.Authentication.UI.Mocks.SystemRegister;

public class SystemRegisterClientMock : ISystemRegisterClient
{
  private static async Task<List<RegisteredSystem>> MockTestHelper()
        {
            await Task.Delay(250);

        RegisteredSystem regsys1 = new()
        {
            SystemTypeId = "4human_hr_system_2024_2",
            SystemVendor = "4Human",
            Description = "4Humans HR system 2024 versjon.",
            DefaultRights =
            [
                new DefaultRight { Right = "Sykemelding - Oppgi leder", ServiceProvider = "Arbeids- og velferdsetaten (NAV)" },
                new DefaultRight { Right = "Søknad om sykepenger", ServiceProvider = "Arbeids- og velferdsetaten (NAV)" }
            ]
        };

        RegisteredSystem regsys2 = new()
        {
            SystemTypeId = "din_lokale_regnskapspartner",
            SystemVendor = "Din Lokale Regnskapspartner AS",
            Description = "Regnskap og Revisor tjenester",
            DefaultRights =
            [
                new DefaultRight { Right = "MVA rapportering", ServiceProvider = "Skatteetaten" },
                new DefaultRight { Right = "Årsregnskap", ServiceProvider = "Skatteetaten" }
            ]
        };

        RegisteredSystem regsys3 = new()
        {
            SystemTypeId = "fiken_smabedrift",
            SystemVendor = "Fiken",
            Description = "Fiken Småbedrift pakken",
            DefaultRights =
            [
                new DefaultRight { Right = "MVA rapportering", ServiceProvider = "Skatteetaten" },
                new DefaultRight { Right = "Årsregnskap", ServiceProvider = "Skatteetaten" }
            ]
        };

        RegisteredSystem regsys4 = new()
        {
            SystemTypeId = "visma_mva_pakke",
            SystemVendor = "Visma",
            Description = "Visma MVA rapportering",
            DefaultRights =
            [
                new DefaultRight { Right = "MVA rapportering", ServiceProvider = "Skatteetaten" }
            ]

        };

        RegisteredSystem regsys5 = new()
        {
            SystemTypeId = "visma_skatt_totalpakke",
            SystemVendor = "Visma",
            Description = "Visma Totalpakke for alle skatterapporterings behov",
            DefaultRights =
            [
                new DefaultRight { Right = "MVA rapportering", ServiceProvider = "Skatteetaten" },
                new DefaultRight { Right = "Årsregnskap", ServiceProvider = "Skatteetaten" },
                new DefaultRight { Right = "Bytte av Revisor", ServiceProvider = "Skatteetaten" },
                new DefaultRight { Right = "Levere Lakselus", ServiceProvider = "Mattilsynet" },
            ]
        };

        List<RegisteredSystem> theList = new()
        {
            regsys1,
            regsys2,
            regsys3,
            regsys4,
            regsys5
        };

            return theList;
        }

        public async Task<List<RegisteredSystem>> GetListRegSys(CancellationToken cancellationToken)
    {
        return await MockTestHelper();
    }
}
