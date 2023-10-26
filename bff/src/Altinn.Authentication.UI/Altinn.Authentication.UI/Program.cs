//using Microsoft.ApplicationInsights.AspNetCore.Extensions;
//using Microsoft.ApplicationInsights.Channel;
//using Microsoft.ApplicationInsights.Extensibility;
//using Microsoft.ApplicationInsights.WindowsServer.TelemetryChannel;
//using Microsoft.Extensions.Logging.ApplicationInsights;
//using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.Extensions.DependencyInjection.Extensions;
using AltinnCore.Authentication.JwtCookie;
using Altinn.Authentication.UI.Extensions;
using Altinn.Authentication.UI.Filters;
using Altinn.Common.AccessTokenClient.Services;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Integration.SystemUsers;
using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Authentication.UI.Integration.SystemRegister;
using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Authentication.UI.Integration.UserProfiles;
using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Integration.Authentication;
using System.Net.Security;
using Altinn.Authentication.UI.Mock.Authentication;
using Altinn.Authentication.UI.Mock.SystemRegister;
using Altinn.Authentication.UI.Mock.SystemUsers;
using Altinn.Authentication.UI.Mock.UserProfiles;
using Altinn.Authentication.UI.Integration.Configuration;

ILogger logger;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

//string applicationInsightsKeySecretName = "ApplicationInsights--InstrumentationKey";
//string applicationInsightsConnectionString = string.Empty;

//ConfigureSetupLogging();

await SetConfigurationProviders(builder.Configuration);

//ConfigureLogging(builder.Logging);

//string frontendProdFolder = AppEnvironment.GetVariable("FRONTEND_PROD_FOLDER", "wwwroot/Authentication/");
string frontendProdFolder = "wwwroot/Authentication/";

builder.Configuration.AddJsonFile(frontendProdFolder + "manifest.json", true, true);
ConfigureServiceDefaults(builder.Services, builder.Configuration);
ConfigureAppSettings(builder.Services, builder.Configuration);
ConfigureAuthenticationAndSecurity(builder.Services, builder.Configuration);
ConfigureFeatureClients(builder.Services, builder.Configuration);
ConfigureFeatureServices(builder.Services, builder.Configuration);
ConfigureDevelopmentAndTestingServices(builder.Services, builder.Configuration);
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
if (!app.Environment.IsDevelopment())
{    
    app.UseHsts();
    app.UseHttpsRedirection();
}

app.UseDefaultSecurityHeaders();

app.UseAuthentication();
app.UseAuthorization();
app.UseCors();

app.UseStaticFiles();
app.MapControllers();

//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

void ConfigureServiceDefaults(IServiceCollection services, IConfiguration configuration)
{
    //Defaults
    services.AddMvc();
    services.AddControllersWithViews();
}

void ConfigureAppSettings (IServiceCollection services, IConfiguration configuration)
{
    //App Configuration
    services.Configure<PlatformSettings>(configuration.GetSection("PlatformSettings"));
    services.AddSingleton(configuration);
    PlatformSettings? platformSettings = configuration.GetSection("PlatformSettings").Get<PlatformSettings>();
}

void ConfigureAuthenticationAndSecurity (IServiceCollection services, IConfiguration configuration)
{
    //Authentication and Security
    services.ConfigureDataProtection();
    services.AddTransient<ISigningCredentialsResolver, SigningCredentialsResolver>();
    services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
    services.TryAddSingleton<ValidateAntiforgeryTokenIfAuthCookieAuthorizationFilter>();
    services.AddAuthentication(JwtCookieDefaults.AuthenticationScheme)
        .AddJwtCookie(JwtCookieDefaults.AuthenticationScheme, configureOptions: options =>
        {
            options.JwtCookieName = "AltinnStudioRuntime";
            options.MetadataAddress = "http://localhost:5101/authentication/api/v1/openid/";

            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false,
                RequireExpirationTime = true,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            if (builder.Environment.IsDevelopment())
            {
                options.RequireHttpsMetadata = false;
            }
        });

    services.AddAntiforgery(options =>
    {
        // asp .net core expects two types of tokens: One that is attached to the request as header, and the other one as cookie.
        // The values of the tokens are not the same and both need to be present and valid in a "unsafe" request.

        // We use this for OIDC state validation. See authentication controller. 
        // https://learn.microsoft.com/en-us/aspnet/core/security/anti-request-forgery?view=aspnetcore-6.0
        // https://github.com/axios/axios/blob/master/lib/defaults.js
        options.Cookie.Name = "AS-XSRF-TOKEN";
        options.Cookie.SameSite = SameSiteMode.Lax;
        options.HeaderName = "X-XSRF-TOKEN";
    });
}

void ConfigureFeatureClients(IServiceCollection services, IConfiguration configuration)
{
    //Clients in the Integration layer for the login user and auth logic
    //services.AddHttpClient<IAuthenticationClient, AuthenticationClientMock>();
    services.AddSingleton<IAuthenticationClient, AuthenticationClientMock>();
    services.AddSingleton<IUserProfileClient, UserProfileClientMock>();
    services.AddSingleton<IPartyClient, PartyClientMock>();

    //Clients for the actual Features' Services
    services.AddSingleton<ISystemUserClient, SystemUserClientMock>();
    services.AddSingleton<ISystemRegisterClient, SystemRegisterClientMock>();    
}

void ConfigureFeatureServices(IServiceCollection services, IConfiguration configuration)
{
    //Services for the login user and auth logic
    services.AddSingleton<IUserProfileService, UserProfileService>();
    services.AddSingleton<IPartyService, PartyService>();

    //Altinn actual Features' Services        
    services.AddSingleton<ISystemUserService, SystemUserService>();
    services.AddSingleton<ISystemRegisterService, SystemRegisterService>();        
}

void ConfigureDevelopmentAndTestingServices(IServiceCollection services, IConfiguration configuration)
{
    //Debug and Development
    services.AddSwaggerGen();
}

async Task SetConfigurationProviders(ConfigurationManager config)
{
    config.AddEnvironmentVariables();
    config.AddCommandLine(args);
    
    //keyvault og applicationinsight ting
}

void ConfigureSetupLogging()
{
    ILoggerFactory loggerFactory = LoggerFactory.Create(builder =>
    {
        builder
            .AddFilter("Microsoft", LogLevel.Warning)
            .AddFilter("System", LogLevel.Warning)
            .AddFilter("Altinn.Authentication.Ui.Program", LogLevel.Debug)
            .AddConsole();
    });
}

void ConfigureLogging(ILoggingBuilder loggingBuilder)
{
    loggingBuilder.ClearProviders();

    //Set up ApplicationInsight here
    // - - - ...
    //


    //Default during dev/test:
    loggingBuilder.AddFilter("Microsoft", LogLevel.Warning);
    loggingBuilder.AddFilter("System", LogLevel.Warning);
    loggingBuilder.AddConsole();
}