namespace Altinn.Authentication.UI.Core.Common.Models

{
    /// <summary>
    /// Simple Id/Value pair using strings for both properties
    /// </summary>
    public record ValuePair
    {
        /// <summary>
        /// The Id, accepts any string
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// The Value, string or string formatted
        /// </summary>
        public string Value { get; set; }
    }
}
