import React, { useState, useEffect } from "react";
import env from "../config/env";
import chatWindowStyles from "../assets/styles/chatWindowStyles";

interface ChatMessage {
    id: number;
    sender: "user" | "ai";
    text: string;
}

const ChatWindow: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [chat, setChat] = useState<ChatMessage[]>([]);
    const [thinkingDots, setThinkingDots] = useState<string>(""); // for animation
    const baseUrl: string = env.VITE_APP_API_URL;

    useEffect(() => {
        // Animate "Thinking..." dots every 500ms
        const interval = setInterval(() => {
            setThinkingDots((prev) => (prev.length < 3 ? prev + "." : ""));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Create user message with unique ID
        const userId = Date.now();
        const userMessage: ChatMessage = {
            id: userId,
            sender: "user",
            text: message,
        };

        setChat((prev) => [...prev, userMessage]);
        setMessage("");

        // Create Thinking message with a small offset to ensure unique ID
        const thinkingId = userId + 1;
        setChat((prev) => [...prev, { id: thinkingId, sender: "ai", text: "Thinking" }]);

        try {
            const apiUrl = `${baseUrl}/api/chat`;
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    question: message,
                    session_id: "user-1", // TODO: make dynamic, eventually
                }),
            });

            const data = await response.json();
            const aiMessage = response.ok ? data?.response || "Failed to get response." : "Error fetching response";

            // Replace "Thinking..." with actual AI message
            setChat((prev) =>
                prev.map((msg) =>
                    msg.id === thinkingId ? { ...msg, text: aiMessage } : msg
                )
            );
        } catch (err) {
            console.error(err);
            setChat((prev) =>
                prev.map((msg) =>
                    msg.id === thinkingId ? { ...msg, text: "Error, try again." } : msg
                )
            );
        }
    };

    return (
        <div style={chatWindowStyles.container}>
            <div style={chatWindowStyles.header}><h1>LunaAI</h1></div>
            <div style={chatWindowStyles.chatBox}>
                {chat.map((msg) => (
                    <div
                        key={msg.id}
                        style={msg.sender === "user" ? chatWindowStyles.userMsg : chatWindowStyles.aiMsg}
                    >
                        {msg.sender === "ai" && msg.text === "Thinking"
                            ? `Thinking${thinkingDots}`
                            : msg.text}
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
                <button type="submit" style={chatWindowStyles.submitButton}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;
