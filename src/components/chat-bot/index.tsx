import { useEffect, useState } from "react";

import { FaPaperPlane } from "react-icons/fa";

import ChatHeader from "@/components/chat-bot/chat-header";
import ChatMessages from "@/components/chat-bot/chat-messages";
import { getBotResponse } from "@/configs/bot-responses";
import { Message } from "@/types/chat-bot";

export default function ChatBot() {
  // Chatbot states
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      text: "Hey, how can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll chat to bottom when messages change
  useEffect(() => {
    const chatContainer = document.getElementById("chat-messages");
    if (chatContainer) {
      // Smoothly scroll the chat container to the bottom
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!chatInput.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: chatInput,
      isBot: false,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // Simulate bot typing
    setIsTyping(true);

    // Simulate bot response after a delay
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
      className={`bg-[#1E1E1E] rounded-[15px] w-full flex flex-col overflow-hidden relative backdrop-blur-sm`}
    >
      <ChatHeader />

      {/* Chat area with blue border */}
      <div id="chat-messages" className="flex-grow bg-[#1E1E1E] h-[525px] overflow-y-auto">
        <ChatMessages messages={chatMessages} isTyping={isTyping} />
      </div>

      {/* Chat input */}
      <div className="bg-[#6B7280] p-2 rounded-t-2xl">
        <form onSubmit={handleChatSubmit} className="flex items-center">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Type your message here"
            className="flex-grow px-2 bg-[#6B7280] text-white placeholder-gray-300 rounded-lg focus:outline-none pb-1"
          />
          <button
            type="submit"
            className={`${
              chatInput.trim()
                ? "bg-[#1a1a1a] hover:bg-red-600 text-white"
                : "bg-gray-600 cursor-not-allowed text-gray-400"
            } rounded-full transition-colors p-3 shadow-l`}
            disabled={!chatInput.trim()}
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
}
