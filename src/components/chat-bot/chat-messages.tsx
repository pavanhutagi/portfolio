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
            className={`max-w-[80%] clip-corner-sm border px-4 py-3 text-sm ${
              msg.isBot
                ? "border-primary-500/40 bg-secondary-800/80 text-text-primaryDark"
                : "border-accent-500/40 bg-accent-500/10 text-text-primaryDark"
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
          <div className="clip-corner-sm border border-primary-500/40 bg-secondary-800/80 px-3 py-1.5 text-primary-300">
            <div className="flex items-center gap-2">
              <FaBrain className="animate-pulse" size={14} />
              <span className="font-mono text-xs uppercase tracking-widest">Thinking...</span>
            </div>
          </div>
        </div>
      )}

      {voiceState === "listening" && !isTyping && (
        <div className="flex justify-end">
          <div className="clip-corner-sm border border-accent-500/40 bg-accent-500/10 px-3 py-1.5 text-accent-300">
            <div className="flex items-center gap-2">
              <FaMicrophone className="animate-pulse" size={14} />
              <span className="font-mono text-xs uppercase tracking-widest">Listening...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
