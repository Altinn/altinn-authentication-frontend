namespace Altinn.Authentication.UI.Core.SystemRegister;

public class RegisteredSystemDTO
{
    public string SystemTypeId { get; set; } = string.Empty;
    public string SystemVendor { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<DefaultRightsDTO> DefaultRights { get; set; } = [];
    public bool SoftDeleted { get; set; } = false;
}