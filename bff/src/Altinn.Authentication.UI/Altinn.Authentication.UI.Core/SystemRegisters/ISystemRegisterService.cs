namespace Altinn.Authentication.UI.Core.SystemRegisters;

public interface ISystemRegisterService
{
    Task<List<RegisteredSystemDTO>> GetListRegSys();
}
