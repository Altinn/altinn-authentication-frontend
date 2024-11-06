namespace Altinn.Authentication.UI.Core.SystemRegister
{
    /// <summary>
    /// Describes an organization
    /// </summary>
    public class FullRights
    {
        public List<ServiceResource> Resources { get; set; } = [];

        public List<AccessPackage> AccessPackages { get; set; } = [];
    }
}