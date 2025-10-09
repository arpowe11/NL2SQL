namespace NL2SQL.Api.Config;

public class AppSettings {
    public string? ApiUrl { get; set; } = Environment.GetEnvironmentVariable("AI_API_URL");
    public string? ApiKey { get; set; } = Environment.GetEnvironmentVariable("AI_API_KEY");
}
