using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace Altinn.Authentication.UI.Health;

public class HealthCheck : IHealthCheck
{
    /// <summary>
    /// TODO: expand the healthcheck to verify that it has access to the "Real" Authentication Component.
    /// </summary>
    /// <param name="context"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken )
    {
        return Task.FromResult(
            HealthCheckResult.Healthy("BFF for Authentication Frontent is healthy."));
    }
}
