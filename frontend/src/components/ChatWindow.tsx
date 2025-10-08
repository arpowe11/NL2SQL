import React, {useState} from "react";
import chatWindowStyles from "../assets/styles/chatWindowStyles";

const ChatWindow: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [chat, setChat] = useState<string[]>([]);
    const baseUrl: string = import.meta.env.VITE_APP_API_URL
    const testKey: string = import.meta.env.VITE_APP_API_TOKEN

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Add user message
        setChat((prev) => [...prev, `You: ${message}`]);

        try {
            // Fetch the api and send request information
            const apiUrl = `${baseUrl}/api/chat`;
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${testKey}`
                },
                credentials: "include",
                body: JSON.stringify({
                    question: message
                })
            });

            // Get the request information and process the response data
            let result;
            const data = await response.text();
            if (data) {
                result = JSON.parse(data);
            }

            // Get the AIs response from the response data
            let aiMessage: string;
            if (response.ok) {
                aiMessage = result?.response || "Failed to get response."
                setChat((prev) => [...prev, aiMessage]);
            } else {
                alert("Failed to fetch response");
                console.error("API error:", result?.error || "Failed to get error message");
            }
        } catch (err) {
            console.error(err);
        }

        setMessage("");
    }

    return (
        <div style={chatWindowStyles.container}>
            <div style={chatWindowStyles.chatBox}>
                {chat.map((msg, index) => (
                    <div key={index} style={msg.startsWith("You:") ? chatWindowStyles.userMsg : chatWindowStyles.aiMsg}>
                        {msg.startsWith("You:") ? msg.replace("You:", "") : msg}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} style={chatWindowStyles.form}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={chatWindowStyles.input}
                />
                <button type="submit" style={chatWindowStyles.submitButton}>Send</button>
            </form>
        </div>
    )
}

export default ChatWindow;
