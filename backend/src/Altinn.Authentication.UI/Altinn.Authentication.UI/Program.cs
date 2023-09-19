//using Microsoft.ApplicationInsights.AspNetCore.Extensions;
//using Microsoft.ApplicationInsights.Channel;
//using Microsoft.ApplicationInsights.Extensibility;
//using Microsoft.ApplicationInsights.WindowsServer.TelemetryChannel;
//using Microsoft.Extensions.Logging.ApplicationInsights;
//using Microsoft.IdentityModel.Logging;
//using Microsoft.IdentityModel.Tokens;
//using Microsoft.OpenApi.Models;
//using Swashbuckle.AspNetCore.Filters;
using Microsoft.Extensions.DependencyInjection.Extensions;


ILogger logger;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

string applicationInsightsKeySecretName = "ApplicationInsights--InstrumentationKey";
string applicationInsightsConnectionString = string.Empty;

//er AccessManagement spesifikt ifra en nuget
//string frontendProdFolder = AppEnvironment.GetVariable("FRONTEND_PROD_FOLDER", "wwwroot/Authentication/");

builder.Configuration.AddJsonFile("wwwroot/Authentication/" + "manifest.json", true, true);
ConfigureServices(builder.Services, builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.UseSwagger();
    //app.UseSwaggerUI();
}
if (!app.Environment.IsDevelopment())
{    
    app.UseHsts();
    app.UseHttpsRedirection();
}

app.UseStaticFiles();
//app.UseDefaultSecurityHeaders();

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
    services.AddControllersWithViews();
    services.AddMvc();
    services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
}

async Task SetConfigurationProviders(ConfigurationManager config)
{
    config.AddEnvironmentVariables();
    config.AddCommandLine(args);
    
    await Task.Delay(10);
    //keyvault og applicationinsight ting
}