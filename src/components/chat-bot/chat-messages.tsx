"use client";

import { FaMicrophone } from "react-icons/fa";
import { FaBrain } from "react-icons/fa6";

import { Message } from "@/types/chat-bot";

type VoiceState = "idle" | "listening" | "thinking" | "speaking";

type ChatMessagesProps = {
  messages: Message[];
  isTyping: boolean;
  voiceState?: VoiceState;
};

export default function ChatMessages({
  messages,
  isTyping,
  voiceState = "idle",
}: ChatMessagesProps) {
  return (
    <div id="chat-messages" className="grow overflow-y-auto py-4 px-4 space-y-4 custom-scrollbar">
      {messages.map((msg, index) => (
        <div key={index} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.isBot
                ? "bg-secondary-300 dark:bg-secondary-400 text-text-primary dark:text-text-primaryDark"
                : "bg-primary-300 dark:bg-primary-400 text-text-primary dark:text-text-primaryDark"
            }`}
          >
            <div className="space-y-2">
              {msg.text
                .split(/\n\n+/)
                .filter((p) => p.trim())
                .map((paragraph, i) => (
                  <p key={i}>{paragraph.trim()}</p>
                ))}
            </div>
            <span className="text-xs opacity-70 block mt-4">
              {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-secondary-300/60 dark:bg-secondary-400/60 text-text-primary dark:text-text-primaryDark rounded-full px-3 py-1.5">
            <div className="flex items-center gap-2">
              <FaBrain className="animate-pulse" size={14} />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        </div>
      )}

      {voiceState === "listening" && !isTyping && (
        <div className="flex justify-end">
          <div className="bg-primary-300/60 dark:bg-primary-400/60 text-text-primary dark:text-text-primaryDark rounded-full px-3 py-1.5">
            <div className="flex items-center gap-2">
              <FaMicrophone className="animate-pulse" size={14} />
              <span className="text-sm">Listening...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
