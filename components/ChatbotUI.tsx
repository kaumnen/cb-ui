"use client";

import { useState, FormEvent } from "react";
import styles from "./ChatbotUI.module.css";

interface Message {
  sender: "user" | "bot";
  text: string;
  intent?: string;
}

const ChatbotUI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      const botMessage: Message = {
        sender: "bot",
        text: data.reply,
        intent: data.intent,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "user" ? styles.userMessage : styles.botMessage
            }
          >
            {msg.intent && (
              <div className={styles.intent}>Intent: {msg.intent}</div>
            )}
            <div>{msg.text}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.inputField}
          placeholder="Type your message..."
        />
        <button type="submit" className={styles.sendButton}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatbotUI;
