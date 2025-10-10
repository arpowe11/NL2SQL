using DotNetEnv;
using NL2SQL.Api.Config;

var builder = WebApplication.CreateBuilder(args);

// Environment settings
Env.Load();
builder.Services.AddSingleton<AppSettings>();

builder.Services.AddHttpClient();

// Add controllers
builder.Services.AddControllers();

// TODO: Maybe move security configs to its own namespace
//Configure CORS
builder.Services.AddCors(options => {
    options.AddPolicy("AllowFrontend", policy => {
        policy.WithOrigins(
                "https://lunaaiclient-eahehnbpg8cueufp.canadacentral-01.azurewebsites.net", 
                "http://localhost:5173", 
                "http://localhost:5174")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();

app.Run();