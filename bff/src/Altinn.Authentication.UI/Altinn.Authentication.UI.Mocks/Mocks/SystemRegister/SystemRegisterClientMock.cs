using Altinn.Authentication.UI.Core.Common.Rights;
using Altinn.Authentication.UI.Core.SystemRegister;

namespace Altinn.Authentication.UI.Mocks.SystemRegister;

public class SystemRegisterClientMock : ISystemRegisterClient
{
  private static async Task<List<RegisteredSystemDTO>> MockTestHelper()
        {
            await Task.Delay(250);

        RegisteredSystemDTO regsys1 = new()
        {
            SystemVendorOrgNumber = "314048431",
            Description = new Dictionary<string, string>
            {
                {"nb", "Kult system." },
                {"en", "Cool system." },
                {"nn", "Framifrå system." }
            },
            SystemId = "4human_hr_system_2024_2",
            SystemVendorOrgName = "4Human",
            Name = new Dictionary<string, string>
            {
                {"nb", "4Humans HR system 2024 versjon." },
                {"en", "4Humans HR system 2024 versjon." },
                {"nn", "4Humans HR system 2024 versjon." }
            },
            Rights =
            [
                
            ]
        };

        RegisteredSystemDTO regsys2 = new()
        {
            SystemVendorOrgNumber = "314048432",
            Description = new Dictionary<string, string>
            {
                {"nb", "Kult system." },
                {"en", "Cool system." },
                {"nn", "Framifrå system." }
            },
            SystemId = "din_lokale_regnskapspartner",
            SystemVendorOrgName = "Din Lokale Regnskapspartner AS",
            Name = new Dictionary<string, string>
            {
                {"nb", "4Humans HR system 2024 versjon." },
                {"en", "4Humans HR system 2024 versjon." },
                {"nn", "4Humans HR system 2024 versjon." }
            },
            Rights =
            [
                
            ]
        };

        RegisteredSystemDTO regsys3 = new()
        {
            SystemVendorOrgNumber = "314048433",
            Description = new Dictionary<string, string>
            {
                {"nb", "Kult system." },
                {"en", "Cool system." },
                {"nn", "Framifrå system." }
            },
            SystemId = "fiken_smabedrift",
            SystemVendorOrgName = "Fiken",
            Name = new Dictionary<string, string>
            {
                {"nb", "4Humans HR system 2024 versjon." },
                {"en", "4Humans HR system 2024 versjon." },
                {"nn", "4Humans HR system 2024 versjon." }
            },
            Rights =
            [
                
            ]
        };

        RegisteredSystemDTO regsys4 = new()
        {
            SystemVendorOrgNumber = "314048434",
            Description = new Dictionary<string, string>
            {
                {"nb", "Kult system." },
                {"en", "Cool system." },
                {"nn", "Framifrå system." }
            },
            SystemId = "visma_mva_pakke",
            SystemVendorOrgName = "Visma",
            Name = new Dictionary<string, string>
            {
                {"nb", "4Humans HR system 2024 versjon." },
                {"en", "4Humans HR system 2024 versjon." },
                {"nn", "4Humans HR system 2024 versjon." }
            },
            Rights =
            [
            ]

        };

        RegisteredSystemDTO regsys5 = new()
        {
            SystemVendorOrgNumber = "314048435",
            Description = new Dictionary<string, string>
            {
                {"nb", "Kult system." },
                {"en", "Cool system." },
                {"nn", "Framifrå system." }
            },
            SystemId = "visma_skatt_totalpakke",
            SystemVendorOrgName = "Visma",
            Name = new Dictionary<string, string>
            {
                {"nb", "4Humans HR system 2024 versjon." },
                {"en", "4Humans HR system 2024 versjon." },
                {"nn", "4Humans HR system 2024 versjon." }
            },
            Rights =
            [
                
            ]
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

    public Task<List<Right>> GetRightsFromSystem(string systemId, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<RegisteredSystemDTO?> GetSystem(string systemId, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
