#nullable enable

namespace Altinn.Authentication.UI.Core.SystemRegister
{
    /// <summary>
    /// Describes an organization
    /// </summary>
    public class Org
    {
        public required Dictionary<string, string> Name { get; set; }

        /// <summary>
        /// The logo
        /// </summary>
        public string? Logo { get; set; }

        /// <summary>
        /// The organization number
        /// </summary>
        public required string Orgnr { get; set; }

        /// <summary>
        /// The homepage
        /// </summary>
        public string? Homepage { get; set; }

        /// <summary>
        /// The environments available for the organzation
        /// </summary>
        public List<string>? Environments { get; set; }
    }
}