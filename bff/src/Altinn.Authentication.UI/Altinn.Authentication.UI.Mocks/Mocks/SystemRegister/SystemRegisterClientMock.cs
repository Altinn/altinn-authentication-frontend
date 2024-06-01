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
            FriendlyProductName = "4Humans HR system 2024 versjon.",
            DefaultRights =
            [
                
            ]
        };

        RegisteredSystem regsys2 = new()
        {
            SystemTypeId = "din_lokale_regnskapspartner",
            SystemVendor = "Din Lokale Regnskapspartner AS",
            FriendlyProductName = "Regnskap og Revisor tjenester",
            DefaultRights =
            [
                
            ]
        };

        RegisteredSystem regsys3 = new()
        {
            SystemTypeId = "fiken_smabedrift",
            SystemVendor = "Fiken",
            FriendlyProductName = "Fiken Småbedrift pakken",
            DefaultRights =
            [
                
            ]
        };

        RegisteredSystem regsys4 = new()
        {
            SystemTypeId = "visma_mva_pakke",
            SystemVendor = "Visma",
            FriendlyProductName = "Visma MVA rapportering",
            DefaultRights =
            [
            ]

        };

        RegisteredSystem regsys5 = new()
        {
            SystemTypeId = "visma_skatt_totalpakke",
            SystemVendor = "Visma",
            FriendlyProductName = "Visma Totalpakke for alle skatterapporterings behov",
            DefaultRights =
            [
                
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
