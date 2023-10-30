using Altinn.Authentication.UI.Health;
using Altinn.Authentication.UI.Tests.Utils;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Newtonsoft.Json;
using System.Net;
using Xunit;

namespace Altinn.Authentication.UI.Tests;

public class HealthCheckTest :IClassFixture<CustomWebApplicationFactory<HealthCheck>>
{
    private readonly CustomWebApplicationFactory<HealthCheck> _factory;

    public HealthCheckTest(CustomWebApplicationFactory<HealthCheck> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task VerifyHealthCheck_OK()
    {
        HttpClient client = SetupUtils.GetTestClient(_factory, false);
        HttpRequestMessage request = new(HttpMethod.Get, $"/health");
        HttpResponseMessage response = await client.SendAsync(request);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        string result = await response.Content.ReadAsStringAsync();
        Assert.Equal(HealthStatus.Healthy.ToString() ,result);
    }
}
