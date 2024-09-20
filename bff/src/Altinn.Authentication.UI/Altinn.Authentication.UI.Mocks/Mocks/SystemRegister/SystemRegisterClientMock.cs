using Altinn.Authentication.UI.Core.Common.Rights;
using Altinn.Authentication.UI.Core.SystemRegister;

namespace Altinn.Authentication.UI.Mocks.SystemRegister;

public class SystemRegisterClientMock : ISystemRegisterClient
{
  private static async Task<List<RegisterSystemResponse>> MockTestHelper()
        {
            await Task.Delay(250);

        RegisterSystemResponse regsys1 = new()
        {
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

        RegisterSystemResponse regsys2 = new()
        {
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

        RegisterSystemResponse regsys3 = new()
        {
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

        RegisterSystemResponse regsys4 = new()
        {
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

        RegisterSystemResponse regsys5 = new()
        {
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

        List<RegisterSystemResponse> theList = new()
        {
            regsys1,
            regsys2,
            regsys3,
            regsys4,
            regsys5
        };

            return theList;
        }

        public async Task<List<RegisterSystemResponse>> GetListRegSys(CancellationToken cancellationToken)
    {
        return await MockTestHelper();
    }

    public Task<List<Right>> GetRightFromSystem(string systemId, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<RegisterSystemResponse?> GetSystem(string systemId, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
