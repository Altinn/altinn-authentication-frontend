using Altinn.Authentication.UI.Controllers;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Authentication.UI.Mock.UserProfiles;
using Altinn.Authentication.UI.Mocks.Mocks;
using Altinn.Authentication.UI.Mocks.Utils;
using Altinn.Authentication.UI.Models;
using Altinn.Authentication.UI.Tests.Utils;
using Altinn.Common.PEP.Interfaces;
using Altinn.Platform.Profile.Models;
using AltinnCore.Authentication.JwtCookie;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using Xunit;

namespace Altinn.Authentication.UI.Tests.Controllers;

[Collection("ProfileController Tests")]
public class ProfileControllerTest : IClassFixture<CustomWebApplicationFactory<ProfileController>>
{
    private readonly CustomWebApplicationFactory<ProfileController> _factory;
    private readonly HttpClient _client;
    private readonly IUserProfileService _userProfileService;    

    public ProfileControllerTest(
        CustomWebApplicationFactory<ProfileController> factory)        
    {
        _factory = factory;
        _userProfileService = new UserProfileService( new UserProfileClientMock() );
        _client = SetupUtils.GetTestClient(_factory, false);
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
        _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        HttpRequestMessage request = new(HttpMethod.Get, $"authfront/api/v1/profile/user");        
        SetupUtils.AddAuthCookie(request, token, "AltinnStudioRuntime");
        
        HttpResponseMessage response = await _client.SendAsync(request, HttpCompletionOption.ResponseContentRead);
                
        UserProfile userProfile = await _userProfileService.GetUserProfile(userId);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        //var content = response.Content;
        //var temp = await content.ReadAsStringAsync();
        //UserProfile? result = JsonSerializer.Deserialize<UserProfile>(temp);
        //Assert.Equal(userProfile.UserName, result.UserName);
    }

    [Fact]
    public async Task GetUser_NotAuth()
    {
        HttpRequestMessage request = new(HttpMethod.Get, $"authfront/api/v1/profile/user");
        HttpResponseMessage response = await _client.SendAsync(request, HttpCompletionOption.ResponseContentRead);
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }
}
