ILogger logger;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

string applicationInsightsKeySecretName = "ApplicationInsights--InstrumentationKey";
string applicationInsightsConnectionString = string.Empty;

//er AccessManagement spesifikt ifra en nuget
//string frontendProdFolder = AppEnvironment.GetVariable("FRONTEND_PROD_FOLDER", "wwwroot/Authentication/");

builder.Configuration.AddJsonFile("wwwroot/Authentication/" + "manifest.json", true, true);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
