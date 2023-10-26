using Altinn.Authentication.UI.Controllers;
using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Authentication.UI.Mock.UserProfiles;
using Altinn.Authentication.UI.Mocks.Mocks;
using Altinn.Authentication.UI.Mocks.Utils;
using Altinn.Common.PEP.Interfaces;
using Altinn.Platform.Profile.Models;
using AltinnCore.Authentication.JwtCookie;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Http.Headers;
using Xunit;

namespace Altinn.Authentication.UI.Tests.Controllers;

public class ProfileControllerTest : IClassFixture<CustomWebApplicationFactory<ProfileController>>
{
    private readonly CustomWebApplicationFactory<ProfileController> _factory;
    private readonly HttpClient _client;
    private readonly IUserProfileClient _userProfileClient;

    public ProfileControllerTest(
        CustomWebApplicationFactory<ProfileController> factory)
        //IUserProfileClient userProfileClient)
    {
        _factory = factory;
        //_userProfileClient = userProfileClient;
        _client = GetTestClient();
    }

    private HttpClient GetTestClient()
    {
        HttpClient client = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                services.AddSingleton<IUserProfileClient, UserProfileClientMock>();
                services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
                services.AddSingleton<IPostConfigureOptions<JwtCookieOptions>, JwtCookiePostConfigureOptionsStub>();
                services.AddSingleton<IPDP, PdpPermitMock>();
            });
        }).CreateClient(new Microsoft.AspNetCore.Mvc.Testing.WebApplicationFactoryClientOptions { AllowAutoRedirect =false});

        client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
        return client;
    }

    private static UserProfile GetMockedUserProfile(int id)
    {
        return new UserProfile
        {
            UserId = id,
            Email = "test@testdomain.no",
            ExternalIdentity = "Somethingsomething",
            PartyId = 5001,
            PhoneNumber = "12345678",
            UserName = "TestUserName",
            UserType = Platform.Profile.Enums.UserType.None,
            Party = new Platform.Register.Models.Party()
            {
                PartyId = 5001,
                OrgNumber = "123456789MVA",
                Name = "Ei kul bedrift"
            },
            ProfileSettingPreference = new ProfileSettingPreference
            {
                DoNotPromptForParty = false, 
                Language = "Norwegian", 
                LanguageType = "NB",
                PreSelectedPartyId = 1
            }
        };
    }

    [Fact]
    public async Task GetUser_UserFound_ReturnUserProfile()
    {
        const int userId = 7007;
        UserProfile user = GetMockedUserProfile(userId);
        var token = PrincipalUtil.GetToken(userId, 7007, 2);
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        HttpResponseMessage response = await _client.GetAsync("authfront/api/v1/profile/user");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}
