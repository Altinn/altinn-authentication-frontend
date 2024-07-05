namespace Altinn.Authentication.UI.Core.Common.Rights
{
    /// <summary>
    /// Default Right on a Registered System
    /// </summary>
    public class Right
    {
        /// <summary>
        /// For instance: Read, Write, Sign
        /// </summary>                
        public string? Action { get; set; }

        /// <summary>
        /// The list of resources at the Service Provider which this Right is for.
        /// </summary>
        public List<AttributePair> Resource { get; set; } = [];
    }
}
