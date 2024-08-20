using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Altinn.Authentication.UI.Core.Common.Rights;

namespace Altinn.Authentication.UI.Core.SystemRegister
{
    /// <summary>
    /// Model for the response of a registered system
    /// A Registered System is a product supplied by a System Vendor,
    /// it may need Rights to use or acccess Resources at a Service Provider.
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class RegisterSystemResponse
    {
        /// <summary>
        /// The unique Id for this product, in human-readable string format.
        /// The id is in the format of system_vendor_name_plus_name_chosen_by_them.
        /// 
        /// An Optimistic Concurrency pattern to create new System Ids is used,
        /// where the Id of the product is prefixed with the SystemVendor to help with uniqueness.
        /// 
        /// When the SystemVendor tries to register a new system (product), 
        /// they should be aware of their own previous system names 
        /// when giving the new system it's id.
        /// </summary>
        [Required]
        public string SystemId { get; set; } = string.Empty;

        /// <summary>
        /// Organization number of the system Vendor that offers the product (system)
        /// </summary>
        [Required]
        public string SystemVendorOrgNumber { get; set; }

        /// <summary>
        /// Organization number of the system Vendor that offers the product (system)
        /// </summary>
        [Required]
        public string SystemVendorOrgName { get; set; } = string.Empty;

        /// <summary>
        /// A short name of the product, used when displaying to the user
        /// </summary>
        [Required]
        public string SystemName { get; set; } = string.Empty;

        /// <summary>
        /// The array of Rights versus System Provider's Resources needed to use this Registered System
        /// </summary>
        public List<RightFrontEnd> Rights { get; set; } = [];

        /// <summary>
        /// Registered Systems can be set to Soft Deleted
        /// </summary>
        public bool SoftDeleted { get; set; } = false;

        /// <summary>
        /// The client Id
        /// </summary>
        [Required]
        public List<string> ClientId { get; set; } = [];

        /// <summary>
        /// Registered systems can be set to false to hide it from the user interface.
        /// This is used when the vendor does not want the user to create system users for specific systems
        /// </summary>
        public bool IsVisible { get; set; } = true;
    }
}
