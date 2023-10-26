using Altinn.Authentication.UI.Controllers;
using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Authentication.UI.Mock.Authentication;
using Altinn.Authentication.UI.Mock.UserProfiles;
using Altinn.Authentication.UI.Mocks.Mocks;
using Altinn.Authentication.UI.Mocks.Utils;
using Altinn.Common.PEP.Implementation;
using Altinn.Common.PEP.Interfaces;
using AltinnCore.Authentication.JwtCookie;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.Text.Json;
using Xunit;
using System.Net.Http.Headers;
using System.Net;

namespace Altinn.Authentication.UI.Tests.Controllers;

public class AuthenticationControllerTest : IClassFixture<CustomWebApplicationFactory<AuthenticationController>>
{
    private readonly CustomWebApplicationFactory<AuthenticationController> _factory;
    private readonly HttpClient _client;
    private readonly HttpClient _clientForNullToken;

    private readonly JsonSerializerOptions options = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public AuthenticationControllerTest(CustomWebApplicationFactory<AuthenticationController> factory)
    {
        string token = PrincipalUtil.GetAccessToken("sbl.authorization");

        _factory = factory;
        
        _client = GetTestClient();               
        _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        _clientForNullToken = GetTestClientForEmptyRefreshToken();
        _clientForNullToken.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        _clientForNullToken.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
    }

    private HttpClient GetTestClientForEmptyRefreshToken()
    {
        HttpClient client = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureTestServices(services =>
            {
                services.AddSingleton<IAuthenticationClient, AuthenticationNullRefreshMock>();
                services.AddTransient<IUserProfileClient, UserProfileClientMock>();
                services.AddSingleton<IPostConfigureOptions<JwtCookieOptions>, JwtCookiePostConfigureOptionsStub>();
                services.AddSingleton<IPDP, PdpPermitMock>();
            });
        }).CreateClient(new Microsoft.AspNetCore.Mvc.Testing.WebApplicationFactoryClientOptions { AllowAutoRedirect = false});

        return client;
    }

    private HttpClient GetTestClient()
    {
        HttpClient client = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureTestServices(services =>
            {
                services.AddSingleton<IAuthenticationClient, AuthenticationClientMock>();
                services.AddTransient<IUserProfileClient, UserProfileClientMock>();
                services.AddSingleton<IPostConfigureOptions<JwtCookieOptions>, JwtCookiePostConfigureOptionsStub>();
                services.AddSingleton<IPDP, PdpPermitMock>();
            });

        }).CreateClient(new Microsoft.AspNetCore.Mvc.Testing.WebApplicationFactoryClientOptions { AllowAutoRedirect = false});

        return client;
    }

    [Fact]
    public async Task Refresh_ValidToken()
    {
        //Act
        HttpResponseMessage response = await _client.GetAsync($"authfront/api/v1/authentication/refresh");
        string expectedCookie = "AltinnStudioRuntime";
        string actualCookie = response.Headers.GetValues("Set-Cookie").FirstOrDefault()!;

        //Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Contains(expectedCookie, actualCookie);
    }
}
