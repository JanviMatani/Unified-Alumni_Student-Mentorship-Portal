import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Replace with your backend URL
const SOCKET_URL = "https://unified-alumni-student-mentorship-portal.onrender.com";

const socket = io(SOCKET_URL);

export default function Chat({ roomId, userName }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Join the specific room (e.g., mentor-student pair)
    socket.emit("joinRoom", { room: roomId });

    // Listen for messages from backend
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [roomId]);

  const handleSend = () => {
    if (newMessage.trim() === "") return;

    const msgData = {
      room: roomId,
      message: newMessage,
      sender: userName,
    };

    // Send to backend
    socket.emit("sendMessage", msgData);

    // Optimistic UI update
    setMessages((prev) => [...prev, { ...msgData, createdAt: new Date() }]);
    setNewMessage("");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold mb-4">Chat</h2>

      <div className="border rounded-lg p-4 h-64 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === userName ? "justify-end" : "justify-start"}`}>
            <div className={`px-3 py-2 rounded-lg ${msg.sender === userName ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}>
              <p className="text-xs font-semibold">{msg.sender}</p>
              <p>{msg.message}</p>
              <span className="text-[10px] text-gray-400">{new Date(msg.createdAt).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
