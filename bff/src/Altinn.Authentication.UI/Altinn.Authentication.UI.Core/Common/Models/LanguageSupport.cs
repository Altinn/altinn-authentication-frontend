namespace Altinn.Authentication.UI.Core.Common.Models
{
    /// <summary>
    /// Supports language options for Text fields
    /// </summary>
    public record LanguageSupport
    {
        /// <summary>
        /// Contains the Text in a version for each language in a ValuePair list.
        /// Id for the language name : "en", "nb", "nn"
        /// Value holds the text version for the chosen language
        /// </summary>
        public List<ValuePair> Text { get; init; } = [];


    }
}
