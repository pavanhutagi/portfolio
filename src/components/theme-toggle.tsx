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
      className={`fixed right-6 top-6 z-50 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-background-dark transition-transform duration-300 dark:bg-background-light sm:right-8 sm:top-8 lg:right-10 lg:top-10 ${
        isVisible ? "translate-x-0" : "translate-x-40"
      }`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <FaSun className="h-5 w-5 text-text-light" />
      ) : (
        <FaMoon className="h-5 w-5 text-text-dark" />
      )}
    </button>
  );
}
