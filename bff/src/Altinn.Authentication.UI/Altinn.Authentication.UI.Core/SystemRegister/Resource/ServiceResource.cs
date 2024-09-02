﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Altinn.Authentication.UI.Core.Common.Rights;

namespace Altinn.Authentication.UI.Core.SystemRegister
{
    /// <summary>
    /// Model describing a complete resource from the resource registry
    /// </summary>
    public class ServiceResource
    {
        /// <summary>
        /// The identifier of the resource
        /// </summary>
        [Required]
        public string? Identifier { get; set; }

        /// <summary>
        /// The version of the resource
        /// </summary>
        public string? Version { get; set; }

        /// <summary>
        /// The title of service
        /// </summary>
        [Required]
        public Dictionary<string, string>? Title { get; set; }

        /// <summary>
        /// Description
        /// </summary>
        [Required]
        public Dictionary<string, string>? Description { get; set; }

        /// <summary>
        /// Description explaining the rights a recipient will receive if given access to the resource
        /// </summary>
        public Dictionary<string, string>? RightDescription { get; set; }

        /// <summary>
        /// The homepage
        /// </summary>
        public string? Homepage { get; set; }

        /// <summary>
        /// The status
        /// </summary>
        public string? Status { get; set; }

        /// <summary>
        /// spatial coverage
        /// This property represents that area(s) a Public Service is likely to be available only within, typically the area(s) covered by a particular public authority.
        /// </summary>
        public List<string>? Spatial { get; set; }

        /// <summary>
        /// List of possible contact points
        /// </summary>
        [Required]
        public List<ContactPoint>? ContactPoints { get; set; }

        /// <summary>
        /// Linkes to the outcome of a public service
        /// </summary>
        public List<string>? Produces { get; set; }

        /// <summary>
        /// IsPartOf
        /// </summary>
        public string? IsPartOf { get; set; }

        /// <summary>
        /// ThematicAreas
        /// </summary>
        public List<string>? ThematicAreas { get; set; }

        /// <summary>
        /// ResourceReference
        /// </summary>
        public List<ResourceReference>? ResourceReferences { get; set; }

        /// <summary>
        /// Is this resource possible to delegate to others or not
        /// </summary>
        public bool Delegable { get; set; } = true;
        
        /// <summary>
        /// The visibility of the resource
        /// </summary>
        public bool Visible { get; set; } = true; 

        /// <summary>
        /// HasCompetentAuthority
        /// </summary>
        [Required]
        public CompetentAuthority? HasCompetentAuthority { get; set; }

        /// <summary>
        /// Keywords
        /// </summary>
        public List<Keyword>? Keywords { get; set; }

        /// <summary>
        /// Defines if the resource is limited by Resource Rights Registry
        /// </summary>
        public bool LimitedByRRR { get; set; }

        /// <summary>
        /// The user acting on behalf of party can be a selfidentifed users
        /// </summary>
        public bool SelfIdentifiedUserEnabled { get; set; }

        /// <summary>
        /// The user acting on behalf of party can be an enterprise users
        /// </summary>
        public bool EnterpriseUserEnabled { get; set; }

        /// <summary>
        /// ResourceType
        /// </summary>
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ResourceType ResourceType { get; set; }

        /// <summary>
        /// Available for type defines which type of entity / person that resource targets
        /// </summary>
        public List<ResourcePartyType>? AvailableForType { get; set; }

        /// <summary>
        /// List of autorizationReference attributes to reference this resource in authorization API
        /// </summary>
        public List<AttributePair>? AuthorizationReference { get; set; }

        /// <summary>
        /// Writes key information when this object is written to Log.
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return $"Identifier: {Identifier}, ResourceType: {ResourceType}";
        }
    }
}