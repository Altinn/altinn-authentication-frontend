using Altinn.Authentication.UI.Controllers;
using Altinn.Authentication.UI.Mocks.Utils;
using Altinn.Authentication.UI.Models;
using Altinn.Authentication.UI.Tests.Utils;
using Altinn.Platform.Profile.Models;
using System.Net;
using System.Net.Http.Headers;
using System.Text.Json;
using Xunit;

namespace Altinn.Authentication.UI.Tests.Controllers;

[Collection("ProfileController Tests")]
public class ProfileControllerTest : IClassFixture<CustomWebApplicationFactory<ProfileController>>
{
    private readonly CustomWebApplicationFactory<ProfileController> _factory;
    private readonly HttpClient _client;
    private readonly JsonSerializerOptions jsonSerializerOptions = new() { PropertyNameCaseInsensitive = true };

    public ProfileControllerTest(
        CustomWebApplicationFactory<ProfileController> factory
        )        
    {
        _factory = factory;
        _client = SetupUtils.GetTestClient(_factory);
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
                OrgNumber = "123456789",
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
        _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        HttpRequestMessage request = new(HttpMethod.Get, $"authfront/api/v1/profile/user");        
        SetupUtils.AddAuthCookie(request, token, "AltinnStudioRuntime");
        SetupUtils.AddAltinnPartyCookie(request, "5001");
        
        HttpResponseMessage response = await _client.SendAsync(request, HttpCompletionOption.ResponseContentRead); 

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var content = response.Content;
        var temp = await content.ReadAsStringAsync();
        ProfileInfo? result = JsonSerializer.Deserialize<ProfileInfo>(temp, jsonSerializerOptions);
        Assert.Equal(user.UserName, result?.LoggedInPersonName);
    }

    [Fact]
    public async Task GetUser_NotAuth()
    {
        HttpRequestMessage request = new(HttpMethod.Get, $"authfront/api/v1/profile/user");
        HttpResponseMessage response = await _client.SendAsync(request, HttpCompletionOption.ResponseContentRead);
        Assert.Equal(HttpStatusCode.Unauthorized , response.StatusCode);
    }

    //[Fact]
    public async Task GetUser_NotFound()
    {
        const int userId= 1111;
        var token = PrincipalUtil.GetToken(userId, userId, 2);
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        var response = await _client.GetAsync($"authfront/api/v1/profile/user");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

}
