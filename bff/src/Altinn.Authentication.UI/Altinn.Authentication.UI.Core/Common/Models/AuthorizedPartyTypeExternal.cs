using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Altinn.Authentication.UI.Core.Common.Models
{
    /// <summary>
    /// Enum for different types of Authorized Party
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum AuthorizedPartyTypeExternal
    {
        /// <summary>
        /// Unknown or unspecified
        /// </summary>
        None = 0,

        /// <summary>
        /// Party Type is a Person
        /// </summary>
        Person = 1,

        /// <summary>
        /// Party Type is an Organization
        /// </summary>
        Organization = 2,

        /// <summary>
        /// Party Type is a Self Identified user
        /// </summary>
        SelfIdentified = 3
    }
}
