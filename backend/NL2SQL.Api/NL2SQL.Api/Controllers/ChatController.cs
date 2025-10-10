using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using NL2SQL.Api.Models;
using NL2SQL.Api.Config;

namespace NL2SQL.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly AppSettings _appSettings;

        public ChatController(IHttpClientFactory httpClientFactory, AppSettings appSettings)
        {
            _httpClientFactory = httpClientFactory;
            _appSettings = appSettings;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ChatRequest req)
        {
            if (string.IsNullOrEmpty(req.Question))
                return BadRequest("Missing question");
            if (string.IsNullOrEmpty(req.SessionId))
                req.SessionId = "default-key";

            var client = _httpClientFactory.CreateClient();

            string pythonApiUrl = _appSettings.ApiUrl + "/api/chat";
            string apiKey = _appSettings.ApiKey;
            Console.WriteLine($"ENV {pythonApiUrl} and {apiKey}");
            
            // Serialize only the fields your Python API expects
            var payload = new
            {
                question = req.Question,
                session_id = req.SessionId
            };

            var jsonContent = new StringContent(
                JsonSerializer.Serialize(payload),
                Encoding.UTF8,
                "application/json"
            );

            // Attach key
            if (!string.IsNullOrEmpty(apiKey))
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            // Send request to Python backend
            var response = await client.PostAsync(pythonApiUrl, jsonContent);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Error calling AI service: {response.StatusCode} - {errorContent}");
                return StatusCode((int)response.StatusCode, "Error calling AI service");
            }

            // Get AI response
            var responseContent = await response.Content.ReadAsStringAsync();

            // Optional: deserialize to extract "luna" field if your Python returns structured JSON
            try
            {
                using var doc = JsonDocument.Parse(responseContent);
                if (doc.RootElement.TryGetProperty("luna", out var lunaValue))
                {
                    return Ok(new { luna = lunaValue.GetString() });
                }
            }
            catch {
                return Content("There was an error getting a response");
            }

            // Return full raw response if no "luna" field
            return Content(responseContent, "application/json");
        }
    }
}
