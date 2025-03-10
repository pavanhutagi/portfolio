"use client";

import { Message } from "@/types/chat-bot";

type ChatMessagesProps = {
  messages: Message[];
  isTyping: boolean;
};

export default function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  return (
    <div
      id="chat-messages"
      className="flex-grow overflow-y-auto py-4 px-4 space-y-4 custom-scrollbar"
    >
      {messages.map((msg, index) => (
        <div key={index} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.isBot
                ? "bg-secondary-300 dark:bg-secondary-400 text-text-primary dark:text-text-primaryDark"
                : "bg-primary-300 dark:bg-primary-400 text-text-primary dark:text-text-primaryDark"
            }`}
          >
            <p>{msg.text}</p>
            <span className="text-xs opacity-70 block mt-1">
              {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-[#374151] text-white rounded-2xl px-4 py-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
              <div
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
