using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace NL2SQL.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase{
    private readonly IHttpClientFactory _httpClientFactory;

    public ChatController(IHttpClientFactory httpClientFactory) {
        _httpClientFactory = httpClientFactory;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ChatRequest req) {
        var client = _httpClientFactory.CreateClient();
        const string pythonApiUrl = ""; // TODO: Add env var here
        const string apiKey = "";  // TODO: Add env var here

        var jsonContent = new StringContent(
            JsonSerializer.Serialize(req),
            Encoding.UTF8,
            "application/json"
        );
        
        // Create the HTTP request
        var requestMessage = new HttpRequestMessage(HttpMethod.Post, pythonApiUrl);
        requestMessage.Content = jsonContent;
        
        // Attach key
        requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
        
        // Send request
        var response = await client.PostAsync(pythonApiUrl, jsonContent);

        if (!response.IsSuccessStatusCode) {
            return StatusCode((int)response.StatusCode, "Error calling AI service");
        }
        
        var responseContent = await response.Content.ReadAsStringAsync();
        return Content(responseContent, "application/json");
    }
}

public class ChatRequest {
    public string Message { get; set; }
}
