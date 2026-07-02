"use client";

import clsx from "clsx";
import { FaMoon, FaSun } from "react-icons/fa";

import { useAppContext } from "@/context/app-context";
import { useIdleVisibility } from "@/hooks/idle-visibility";

export default function ThemeToggle() {
  const isVisible = useIdleVisibility();
  const { theme, toggleTheme, isChatOpen } = useAppContext();

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        "fixed z-50",

        "mb-14 sm:mb-16 md:mb-0",
        "bottom-6 sm:bottom-8 md:bottom-auto",
        "left-6 sm:left-8 md:left-auto",
        "md:top-8 md:right-8",

        "w-[40px] h-[40px]",
        "sm:w-[45px] sm:h-[45px]",
        "lg:w-[50px] lg:h-[50px]",

        "flex items-center justify-center",
        "border border-primary-500/40 bg-secondary-900/80 backdrop-blur-md",
        "text-primary-400",
        "rounded-full",
        "hover:border-primary-500 hover:glow-cyan hover:text-primary-300",

        "transition-all duration-300",

        isVisible ? "translate-x-0" : "-translate-x-40 md:translate-x-40",
        isChatOpen && "max-sm:-translate-x-40!"
      )}
    >
      {theme === "dark" ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
    </button>
  );
}
