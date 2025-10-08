import React, {useState} from "react";
import chatWindowStyles from "../assets/styles/chatWindowStyles";

const ChatWindow: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [chat, setChat] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Add user message
        setChat((prev) => [...prev, `You: ${message}`]);

        // TODO: Change this with a fetch to get the actual ai response via the api
        // Simulate AI response
        setTimeout(() => {
            setChat((prev) => [...prev, `I received your message "${message}"`]);
        }, 1000);

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
