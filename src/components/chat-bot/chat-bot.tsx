"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
import { FaPaperPlane } from "react-icons/fa";

import ChatHeader from "@/components/chat-bot/chat-header";
import ChatMessages from "@/components/chat-bot/chat-messages";
import { getBotResponse } from "@/configs/bot-responses";
import { Message } from "@/types/chat-bot";

interface ChatBotProps {
  height: number;
}

export default function ChatBot({ height }: ChatBotProps) {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      text: "Hey, how can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const chatContainer = document.getElementById("chat-messages");
    if (chatContainer) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!chatInput.trim()) return;

    const userMessage: Message = {
      text: chatInput,
      isBot: false,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        text: getBotResponse(chatInput),
        isBot: true,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div
      className={clsx(
        "flex flex-col",
        "w-full",
        `h-[85vh] lg:h-[${height}px]`,
        "bg-secondary-500 dark:bg-secondary-200",
        "rounded-[15px]",
        "overflow-hidden",
        "relative",
        "backdrop-blur-sm"
      )}
    >
      <ChatHeader />

      <div
        id="chat-messages"
        className={clsx("flex-grow", "bg-secondary-500 dark:bg-secondary-200", "overflow-y-auto")}
      >
        <ChatMessages messages={chatMessages} isTyping={isTyping} />
      </div>

      <div className={clsx("bg-gray-400 dark:bg-gray-600 ", "p-2", "rounded-t-2xl")}>
        <form onSubmit={handleChatSubmit} className="flex items-center">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Type your message here"
            className={clsx(
              "flex-grow",
              "px-2 pb-1",
              "bg-gray-400 dark:bg-gray-600 ",
              "text-text-primary dark:text-text-primaryDark",
              "placeholder-text-secondary dark:placeholder-text-secondaryDark",
              "rounded-lg",
              "focus:outline-none"
            )}
          />
          <button
            type="submit"
            className={clsx(
              "rounded-full",
              "p-3",
              "shadow-l",
              "transition-colors",
              chatInput.trim()
                ? "bg-[#1a1a1a] hover:bg-red-600 text-white"
                : "bg-gray-500 cursor-not-allowed text-gray-400"
            )}
            disabled={!chatInput.trim()}
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
}
