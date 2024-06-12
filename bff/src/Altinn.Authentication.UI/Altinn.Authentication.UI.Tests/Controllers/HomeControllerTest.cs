using Altinn.Authentication.UI.Tests.Utils;
using Altinn.Authentication.UI.Controllers;
using Altinn.Authentication.UI.Mocks.Utils;
using Xunit;
using System.Net.Http.Headers;
using System.Net;

namespace Altinn.Authentication.UI.Tests.Controllers;

/// <summary>
/// Tests for <see cref="HomeController"/>
/// </summary>
[Collection ("HomeController Tests")]
public class HomeControllerTest : IClassFixture<CustomWebApplicationFactory<HomeController>>
{
    private readonly CustomWebApplicationFactory<HomeController> _factory;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="factory"></param>
    public HomeControllerTest(CustomWebApplicationFactory<HomeController> factory)
    {
        _factory = factory;
    }

    /// <summary>
    /// Test: Checks if antiforgery token is set when authenticated
    /// </summary>
    [Fact]
    public async Task Index_Authenticated()
    {
        HttpClient client = SetupUtils.GetTestClient(_factory, false);
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        string token = PrincipalUtil.GetAccessToken("sbl.authorization");            
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        //Act
        HttpResponseMessage response = await client.GetAsync($"authfront/");
        IEnumerable<string> cookieHeaders = response.Headers.GetValues("Set-Cookie");
        IEnumerable<string> xframeHeaders = response.Headers.GetValues("X-Frame-Options");
        IEnumerable<string> contentTypeHeaders = response.Headers.GetValues("X-Content-Type-Options");
        IEnumerable<string> xssProtectionHeaders = response.Headers.GetValues("X-XSS-Protection");
        IEnumerable<string> referrerPolicyHeaders = response.Headers.GetValues("Referer-Policy");

        //Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal(3, cookieHeaders.Count());
        Assert.StartsWith("AS-", cookieHeaders.ElementAt(0));
        Assert.StartsWith("XSR", cookieHeaders.ElementAt(1));
        Assert.StartsWith("i18next", cookieHeaders.ElementAt(2));
        Assert.StartsWith("deny", xframeHeaders.ElementAt(0));
        Assert.StartsWith("nosniff", contentTypeHeaders.ElementAt(0));
        Assert.StartsWith("0", xssProtectionHeaders.ElementAt(0));
        Assert.StartsWith("no-referer", referrerPolicyHeaders.ElementAt(0));


    }

    /// <summary>
    /// Test: User should be redirected when not authenticated
    /// </summary>  
    [Fact]
    public async Task Index_NotAuthenticated()
    {
        //Arrange
        HttpClient client = SetupUtils.GetTestClient(_factory, true);
        string requestUrl = "http://localhost:5101/authentication/api/v1/authentication?goto=http%3a%2f%2flocalhost%3a5101%2fauthfront%2f";

        //Act
        HttpResponseMessage response = await client.GetAsync($"authfront/");

        //Assert
        Assert.Equal(requestUrl, response.RequestMessage?.RequestUri?.ToString());
    }


    /// <summary>
    /// Test: User has a cookie to authenticate with, should get Home Ok
    /// and find the chosen language from the UserProfile
    /// </summary>  
    [Fact] 
    public async Task GetHome_Ok_WithAuthCookie()
    {
        string token = PrincipalUtil.GetAccessToken("sbl.authorization");
        HttpClient client = SetupUtils.GetTestClient(_factory, false);
        HttpRequestMessage request = new (HttpMethod.Get, "authfront/");

        SetupUtils.AddAuthCookie(request, token, "AltinnStudioRuntime");

        HttpResponseMessage response = await client.SendAsync(request);
        _ = await response.Content.ReadAsStringAsync();
        IEnumerable<string> cookieHeaders = response.Headers.GetValues("Set-Cookie");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.True(request.Headers.Contains("Cookie"));
        Assert.Equal(3, cookieHeaders.Count());
        Assert.StartsWith("AS-", cookieHeaders.ElementAt(0));
        Assert.StartsWith("XSR", cookieHeaders.ElementAt(1));
        Assert.StartsWith("i18next", cookieHeaders.ElementAt(2));
    }

    [Fact]
    public async Task GetHome_UnAuthorized_WithInvalidAuthCookie()
    {
        string token = "This is an invalid token";

        HttpClient client = SetupUtils.GetTestClient(_factory, true);
        HttpRequestMessage request = new(HttpMethod.Get, $"authfront/");

        SetupUtils.AddAuthCookie(request, token, "AltinnStudioRuntime");

        HttpResponseMessage response = await client.SendAsync(request);
        string requestUrl = "http://localhost:5101/authentication/api/v1/authentication?goto=http%3a%2f%2flocalhost%3a5101%2fauthfront%2f";
        
        Assert.Equal(requestUrl, response.RequestMessage!.RequestUri!.ToString());
    }

}
