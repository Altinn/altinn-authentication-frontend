using Altinn.Authentication.UI.Extensions;

ILogger logger;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

string applicationInsightsKeySecretName = "ApplicationInsights--InstrumentationKey";
string applicationInsightsConnectionString = string.Empty;

//ConfigureSetupLogging();

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
builder.Services.AddIntegrationLayer();
builder.Services.AddCoreServices();

//Swagger
builder.Services.ConfigureDevelopmentAndTestingServices();

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