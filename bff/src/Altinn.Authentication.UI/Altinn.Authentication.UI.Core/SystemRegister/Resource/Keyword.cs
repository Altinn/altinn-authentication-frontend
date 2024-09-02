namespace Altinn.Authentication.UI.Core.SystemRegister
{
    /// <summary>
    /// Model for defining keywords
    /// </summary>
    public class Keyword
    {
        /// <summary>
        /// The key word
        /// </summary>
        public required string Word { get; set; }

        /// <summary>
        /// Language of the key word
        /// </summary>
        public required string Language { get; set; }
    }
}