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
      className={`fixed mb-14 sm:mb-16 bottom-6 left-6 sm:bottom-8 sm:left-8 md:top-8 md:bottom-auto md:left-auto md:right-8 md:mb-0 z-50 drop-shadow-[0_0_4px_rgba(0,0,0,0.2)] flex w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px] items-center justify-center rounded-full bg-background-dark transition-transform duration-300 dark:bg-background-light ${
        isVisible ? "translate-x-0" : "-translate-x-40 md:translate-x-40"
      }`}
    >
      {theme === "dark" ? (
        <FaSun className="h-5 w-5 text-text-light" />
      ) : (
        <FaMoon className="h-5 w-5 text-text-dark" />
      )}
    </button>
  );
}
