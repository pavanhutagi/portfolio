"use client";

import clsx from "clsx";
import { FaTimes } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";

import ChatBot from "@/components/chat-bot/chat-bot";
import { useAppContext } from "@/context/app-context";
import { useIdleVisibility } from "@/hooks/idle-visibility";

export default function ChatToggle() {
  const isVisible = useIdleVisibility();
  const { isMenuOpen, isChatOpen, setIsChatOpen, isChatBotActive } = useAppContext();

  const visibilityClass = clsx({
    "translate-x-0": isMenuOpen || isVisible || isChatOpen,
    "translate-x-40": !isMenuOpen && !isVisible && !isChatOpen,
  });

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 z-40 sm:hidden",
          "bg-black/60 backdrop-blur-sm",
          "transition-opacity duration-300",
          isChatOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsChatOpen(false)}
      />

      <div
        className={clsx(
          "fixed z-50",
          "bottom-[76px] right-6 sm:bottom-8 sm:right-[89px] lg:bottom-10 lg:right-[102px]",
          "w-[calc(100vw-3rem)] sm:w-[400px] lg:w-[420px]",
          "h-[85vh] sm:h-[650px]",
          "rounded-[15px] overflow-hidden",
          "shadow-2xl",
          "transition-all duration-300 origin-bottom-right",
          isChatOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        <ChatBot className="h-full" />
      </div>

      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={clsx(
          "fixed z-50 flex items-center justify-center rounded-full transition-all duration-300",
          "w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px]",
          "bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10",
          "backdrop-blur-md",
          !isChatOpen && isChatBotActive
            ? "bg-primary-500 text-secondary-900 animate-pulse-ring"
            : "border border-primary-500/40 bg-secondary-900/80 text-primary-400 hover:border-primary-500 hover:glow-cyan hover:text-primary-300",
          visibilityClass
        )}
      >
        {isChatOpen ? <FaTimes size={20} /> : <RiRobot2Fill size={22} />}
      </button>
    </>
  );
}
