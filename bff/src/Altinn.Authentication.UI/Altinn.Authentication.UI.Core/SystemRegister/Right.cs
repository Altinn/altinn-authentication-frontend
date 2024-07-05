namespace Altinn.Authentication.UI.Core.SystemRegister
{
    /// <summary>
    /// Default Right on a Registered System
    /// </summary>
    public class Right
    {
        /// <summary>
        /// For instance: Read, Write, Sign
        /// Optional. If null or "All" the system will expect all actionsrights to 
        /// be required on the Delegationcheck validation
        /// </summary>                
        public string? ActionRight { get; set; }

        /// <summary>
        /// The list of resources at the Service Provider which this Right is for.
        /// </summary>
        public List<AttributePair> Resources { get; set; } = [];

        /// <summary>
        /// The identifier for the Service Provider of the Resource.        
        /// </summary>
        public string ServiceProvider { get; set; } = "Skatteetaten";
    }
}
