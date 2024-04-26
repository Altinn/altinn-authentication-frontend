using Altinn.Authentiation.UI.Configuration;
using Altinn.Authentication.UI.Core.AppConfiguration;
using Altinn.Authentication.UI.Extensions;
using Altinn.Authentication.UI.Filters;
using Altinn.Authentication.UI.Health;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.ApplicationInsights.AspNetCore.Extensions;
using Microsoft.ApplicationInsights.Channel;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.ApplicationInsights.WindowsServer.TelemetryChannel;

ILogger logger;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

string applicationInsightsKeySecretName = "ApplicationInsights--InstrumentationKey";
string applicationInsightsConnectionString = string.Empty;

ConfigureSetupLogging();

await SetConfigurationProviders(builder.Configuration);

ConfigureLogging(builder.Logging);


//string frontendProdFolder = AppEnvironment.GetVariable("FRONTEND_PROD_FOLDER", "wwwroot/Authentication/");
string frontendProdFolder = "wwwroot/Authentication/";

// The defaults and appsettings
builder.Configuration.AddJsonFile(frontendProdFolder + "manifest.json", true, true);
builder.Services.ConfigureServiceDefaults();
builder.Services.ConfigureAppSettings(builder.Configuration);


//Authentication and security
builder.Services.ConfigureAuthenticationAndSecurity(builder);

//Adds the layers
builder.Services.AddIntegrationLayer(builder.Environment.IsDevelopment());
builder.Services.AddCoreServices();

//Swagger
builder.Services.ConfigureDevelopmentAndTestingServices();

//Application Insights
ConfigureAppliationInsightsServices();

//Need the httpcontext accessor
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

app.MapHealthChecks("/health");

app.Run();

async Task SetConfigurationProviders(ConfigurationManager config)
{
    config.AddEnvironmentVariables();
    config.AddCommandLine(args);

    //keyvault og applicationinsight ting
    if (!builder.Environment.IsDevelopment())
    {
        await ConfigureApplicationInsights(config);
        await ConfigureKeyVaultSettings(config);
    }
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

    logger = loggerFactory.CreateLogger<Program>();
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

async Task ConfigureApplicationInsights(ConfigurationManager config)
{
    KeyVaultSettings keyVaultSettings = new KeyVaultSettings();

    config.GetSection("KeyVaultSettings").Bind(keyVaultSettings);

    try
    {
        SecretClient client = new SecretClient(new Uri(keyVaultSettings.SecretUri), new DefaultAzureCredential());
        KeyVaultSecret secret = await client.GetSecretAsync(applicationInsightsKeySecretName);
        applicationInsightsConnectionString = string.Format("InstrumentationKey={0}", secret.Value);
    }
    catch (Exception vaultException)
    {
        logger.LogError(vaultException, "Unable to read application insights key.");
    }
}

void ConfigureAppliationInsightsServices()
{
    if (!string.IsNullOrEmpty(applicationInsightsConnectionString))
    {
        builder.Services.AddSingleton(typeof(ITelemetryChannel), new ServerTelemetryChannel
        { StorageFolder = "/tmp/logtelemetry" });
        builder.Services.AddApplicationInsightsTelemetry(new ApplicationInsightsServiceOptions
        {
            ConnectionString = applicationInsightsConnectionString,
        });

        builder.Services.AddApplicationInsightsTelemetryProcessor<HealthTelemetryFilter>();
        builder.Services.AddApplicationInsightsTelemetryProcessor<IdentityTelemetryFilter>();
        builder.Services.AddSingleton<ITelemetryInitializer, CustomTelemetryInitializer>();

        logger.LogInformation("Startup // ApplicationInsightsConnectionString = {applicationInsightsConnectionString}", applicationInsightsConnectionString);
    }
}

async Task ConfigureKeyVaultSettings(ConfigurationManager config)
{
    KeyVaultSettings keyVaultSettings = new KeyVaultSettings();

    config.GetSection("KeyVaultSettings").Bind(keyVaultSettings);

    try
    {
        config.AddAzureKeyVault(new Uri(keyVaultSettings.SecretUri), new DefaultAzureCredential());
    }
    catch (Exception vaultException)
    {
        logger.LogError(vaultException, "Unable to add key vault secrets to config.");
    }
}