"use client";

import { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import { FaPaperPlane } from "react-icons/fa";

import ChatHeader from "@/components/chat-bot/chat-header";
import ChatMessages from "@/components/chat-bot/chat-messages";
import { Message } from "@/types/chat-bot";

interface ChatBotProps {
  height: number;
}

export default function ChatBot({ height }: ChatBotProps) {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      text: "Hey! I'm Pavan — well, an AI version of me. Ask me anything about my work, skills, or just say hi!",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const chatContainer = document.getElementById("chat-messages");
    if (chatContainer) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages]);

  const addMessageAndPlayTTS = async (botResponse: Message) => {
    try {
      setIsSpeaking(true);

      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: botResponse.text }),
      });

      if (!response.ok) {
        throw new Error("TTS failed");
      }

      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(url);
      };

      setChatMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);

      await audio.play();
    } catch (error) {
      console.error("Failed to play TTS audio:", error);
      setChatMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
      setIsSpeaking(false);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMessage: Message = {
      text,
      isBot: false,
      timestamp: new Date(),
    };

    const updatedMessages = [...chatMessages, userMessage];
    setChatMessages(updatedMessages);
    setIsTyping(true);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((msg) => ({
            text: msg.text,
            isBot: msg.isBot,
          })),
        }),
        signal: abortControllerRef.current.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      const botResponse: Message = {
        text: data.response,
        isBot: true,
        timestamp: new Date(),
      };

      await addMessageAndPlayTTS(botResponse);
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") return;

      const errorMessage: Message = {
        text: "Oops, something went wrong on my end. Try again in a bit!",
        isBot: true,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false);
    } finally {
      abortControllerRef.current = null;
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!chatInput.trim() || isTyping) return;

    const currentInput = chatInput;
    setChatInput("");
    await sendMessage(currentInput);
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
        "backdrop-blur-xs"
      )}
    >
      <ChatHeader />

      <div
        id="chat-messages"
        className={clsx("grow", "bg-secondary-500 dark:bg-secondary-200", "overflow-y-auto")}
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
              "grow",
              "px-2 pb-1",
              "bg-gray-400 dark:bg-gray-600 ",
              "text-text-primary dark:text-text-primaryDark",
              "placeholder-text-secondary dark:placeholder-text-secondaryDark",
              "rounded-lg",
              "focus:outline-hidden"
            )}
          />
          <button
            type="submit"
            className={clsx(
              "rounded-full",
              "p-3",
              "shadow-l",
              "transition-colors",
              chatInput.trim() && !isTyping
                ? "bg-background-subtleDark hover:bg-red-600 text-white"
                : "bg-gray-500 cursor-not-allowed text-gray-400"
            )}
            disabled={!chatInput.trim() || isTyping}
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
}
