using Altinn.App.Core.Health;
using Altinn.Authentication.UI.Core.AppConfiguration;
using Altinn.Authentication.UI.Core.Authentication;
using Altinn.Authentication.UI.Core.SystemRegister;
using Altinn.Authentication.UI.Core.SystemUsers;
using Altinn.Authentication.UI.Core.UserProfiles;
using Altinn.Authentication.UI.Filters;
using Altinn.Authentication.UI.Integration.AccessToken;
using Altinn.Authentication.UI.Integration.Authentication;
using Altinn.Authentication.UI.Integration.KeyVault;
using Altinn.Authentication.UI.Integration.SystemRegister;
using Altinn.Authentication.UI.Integration.SystemUsers;
using Altinn.Authentication.UI.Integration.UserProfiles;
using Altinn.Common.AccessTokenClient.Services;
using AltinnCore.Authentication.JwtCookie;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;

namespace Altinn.Authentication.UI.Extensions
{
    /// <summary>
    /// Extensions for the Program.cs 
    /// </summary>
    public static class ProgramConfigurationAndDependencyInjection
    {
        /// <summary>
        /// Extension method on Program.cs
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection ConfigureServiceDefaults(this IServiceCollection services)
        {
            //Defaults
            services.AddMvc();
            services.AddControllersWithViews();
            services.AddHealthChecks().AddCheck<HealthCheck>("authentication_ui_health_check");

            return services;
        }
        /// <summary>
        /// Extension method on Program.cs
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public static IServiceCollection ConfigureAppSettings(this IServiceCollection services, IConfiguration configuration)
        {
            //App Configuration
            services.Configure<Integration.Configuration.PlatformSettings>(configuration.GetSection("PlatformSettings"));
            Integration.Configuration.PlatformSettings? platformSettings = configuration.GetSection("PlatformSettings").Get<Integration.Configuration.PlatformSettings>();

            services.Configure<CacheConfig>(configuration.GetSection("CacheConfig"));
            services.Configure<GeneralSettings>(configuration.GetSection("GeneralSettings"));
            services.Configure<KeyVaultSettings>(configuration.GetSection("KeyVaultSettings"));
            services.Configure<ClientSettings>(configuration.GetSection("ClientSettings"));

            services.AddSingleton(configuration);

            return services;
        }

        /// <summary>
        /// Extension method for Program
        /// </summary>
        /// <param name="services"></param>
        /// <param name="builder"></param>
        /// <returns></returns>
        public static IServiceCollection ConfigureAuthenticationAndSecurity(this IServiceCollection services, WebApplicationBuilder builder)
        {
            //Authentication and Security
            services.ConfigureDataProtection();
            services.AddTransient<ISigningCredentialsResolver, SigningCredentialsResolver>();
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.TryAddSingleton<ValidateAntiforgeryTokenIfAuthCookieAuthorizationFilter>();

            //App Configuration
            services.Configure<Integration.Configuration.PlatformSettings>(builder.Configuration.GetSection("PlatformSettings"));
            Integration.Configuration.PlatformSettings? platformSettings = builder.Configuration.GetSection("PlatformSettings").Get<Integration.Configuration.PlatformSettings>();

            services.AddAuthentication(JwtCookieDefaults.AuthenticationScheme)
                .AddJwtCookie(JwtCookieDefaults.AuthenticationScheme, configureOptions: options =>
                {
                    options.JwtCookieName = "AltinnStudioRuntime";
                    options.MetadataAddress = platformSettings?.OpenIdWellKnownEndpoint;

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

            return services;
        }

        /// <summary>
        /// Adds Clients for Integration to the Authentication Component for AuthenticationClient, UserProfileClient, PartyClient, SystemUserClient and SystemRegisterClient
        /// </summary>
        /// <param name="services"></param>
        /// <param name="isDevelopment"></param>
        /// <returns></returns>
        public static IServiceCollection AddIntegrationLayer(this IServiceCollection services, bool isDevelopment)
        {
            //Clients in the Integration layer for the login user and auth logic
            //services.AddHttpClient<IAuthenticationClient, AuthenticationClientMock>();
            services.AddHttpClient<IAuthenticationClient, AuthenticationClient>();
            services.AddHttpClient<IUserProfileClient, UserProfileClient>();

            //Providers and supporting services
            if (isDevelopment)
            {
                services.AddTransient<IKeyVaultService, LocalKeyVaultService>();
            }
            else
            {
                services.AddTransient<IKeyVaultService, KeyVaultService>();
            }

            services.AddTransient<IAccessTokenGenerator, AccessTokenGenerator>();
            services.AddTransient<IAccessTokenProvider,  AccessTokenProvider>();


            //Clients for the actual Features' Services
            services.AddHttpClient<ISystemUserClient, SystemUserClient>();
            services.AddHttpClient<ISystemRegisterClient, SystemRegisterClient>();
            services.AddHttpClient<IAccessManagementClient, AccessManagementClient>();
            services.AddHttpClient<IResourceRegistryClient, ResourceRegistryClient>();
            services.AddHttpClient<IRequestClient, RequestClient>();

            return services;
        }

        /// <summary>
        /// Adds UserProfileService, PartyService, SystemUserService and SystemRegisterService to the DI
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public static IServiceCollection AddCoreServices(this IServiceCollection services)
        {
            //Services for the login user and auth logic
            services.AddTransient<IUserProfileService, UserProfileService>();
            services.AddTransient<IPartyService, PartyService>();

            //Altinn actual Features' Services        
            services.AddTransient<ISystemUserService, SystemUserService>();
            services.AddTransient<ISystemRegisterService, SystemRegisterService>();
            services.AddTransient<IRequestService, RequestService>();
            services.AddHttpClient<IAccessManagementClient, AccessManagementClient>();
            services.AddHttpClient<IRegisterClient, RegisterClient>();
            services.AddHttpClient<IRequestClient, RequestClient>();

            return services;
        }

        /// <summary>
        /// Extension method on Program app builder
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public static IServiceCollection ConfigureDevelopmentAndTestingServices(this IServiceCollection services)
        {
            //Debug and Development
            services.AddSwaggerGen(c =>
            {
                var xmlDocumentationFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlDocumentationFile);
                c.IncludeXmlComments(xmlPath);
            });

            return services;    
        }
    }
}
