using System.Text.Json.Serialization;

namespace NL2SQL.Api.Models;

public class ChatRequest {
    [JsonPropertyName("question")]
    public string Question { get; set; }
    
    [JsonPropertyName("session_id")]
    public string SessionId { get; set; }
}
