using System.ComponentModel.DataAnnotations;

namespace Altinn.Authentication.UI.Core.SystemRegister
{
    /// <summary>
    /// Model describing a complete access package
    /// </summary>
    public class AccessPackage
    {
        /// <summary>
        /// The id of the access package
        /// </summary>
        [Required]
        public required string Id { get; set; }

        /// <summary>
        /// The urn of the access package
        /// </summary>
        [Required]
        public required string Urn { get; set; }

        /// <summary>
        /// The title of service
        /// </summary>
        [Required]
        public string? Name { get; set; }

        public List<ServiceResource> Resources { get; set; } = [];
    }
}