"use client";

import { FaMoon, FaSun } from "react-icons/fa";

import { useAppContext } from "@/context/app-context";
import { useIdleVisibility } from "@/hooks/idle-visibility";

export default function ThemeToggle() {
  const isVisible = useIdleVisibility();
  const { theme, toggleTheme } = useAppContext();

  return (
    <button
      onClick={toggleTheme}
      className={`bg-dark-background dark:bg-background rounded-full w-[50px] h-[50px] flex items-center justify-center fixed top-6 right-6 sm:top-8 sm:right-8 lg:top-10 lg:right-10 transition-transform duration-300 z-50 ${
        isVisible ? "translate-x-0" : "translate-x-40"
      }`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <FaSun className="w-5 h-5 text-text " />
      ) : (
        <FaMoon className="w-5 h-5 text-dark-text" />
      )}
    </button>
  );
}
