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
using Altinn.Common.PEP.Configuration;
using Altinn.Authentication.UI.Extensions;
using Altinn.Authentication.UI.Filters;
using Altinn.Common.AccessTokenClient.Services;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Integration.SystemUsers;
using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Authentication.UI.Integration.SystemRegister;

ILogger logger;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

//string applicationInsightsKeySecretName = "ApplicationInsights--InstrumentationKey";
//string applicationInsightsConnectionString = string.Empty;

//string frontendProdFolder = AppEnvironment.GetVariable("FRONTEND_PROD_FOLDER", "wwwroot/Authentication/");
string frontendProdFolder = "wwwroot/Authentication/";

builder.Configuration.AddJsonFile(frontendProdFolder + "manifest.json", true, true);
ConfigureServices(builder.Services, builder.Configuration);
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


void ConfigureServices(IServiceCollection services, IConfiguration configuration)
{
    //Defaults
    services.AddMvc();
    services.AddControllersWithViews();

    //App Configuration
    //PlatformSettings platformSettings = configuration.GetSection("PlatformSettings").Get<PlatformSettings>(); 


    //Authentication and Security
    services.ConfigureDataProtection();    
    services.AddTransient<ISigningCredentialsResolver, SigningCredentialsResolver>();   
    
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

    services.TryAddSingleton<ValidateAntiforgeryTokenIfAuthCookieAuthorizationFilter>();

    //Feature functional services
    services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
    services.TryAddSingleton<ISystemUserClient, SystemUserClient>();
    services.TryAddSingleton<ISystemUserService, SystemUserService>();
    services.TryAddSingleton<ISystemRegisterService, SystemRegisterService>();
    services.TryAddSingleton<ISystemRegisterClient, SystemRegisterClient>();

    //Debug and Development
    services.AddSwaggerGen();
}

async Task SetConfigurationProviders(ConfigurationManager config)
{
    config.AddEnvironmentVariables();
    config.AddCommandLine(args);
    
    await Task.Delay(10);
    //keyvault og applicationinsight ting
}