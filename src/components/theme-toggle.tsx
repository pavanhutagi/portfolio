"use client";

import clsx from "clsx";
import { FaMoon, FaSun } from "react-icons/fa";

import { useAppContext } from "@/context/app-context";
import { useIdleVisibility } from "@/hooks/idle-visibility";

export default function ThemeToggle() {
  const isVisible = useIdleVisibility();
  const { theme, toggleTheme } = useAppContext();

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        // Base & positioning
        "fixed z-50",

        // Margins & positioning
        "mb-14 sm:mb-16 md:mb-0",
        "bottom-6 sm:bottom-8 md:bottom-auto",
        "left-6 sm:left-8 md:left-auto",
        "md:top-8 md:right-8",

        // Dimensions
        "w-[40px] h-[40px]",
        "sm:w-[45px] sm:h-[45px]",
        "lg:w-[50px] lg:h-[50px]",

        // Styling
        "flex items-center justify-center",
        "bg-background-elevatedDark dark:bg-background-elevated",
        "text-text-primaryDark dark:text-text-primary",
        "drop-shadow-[0_0_4px_rgba(0,0,0,0.2)]",
        "rounded-full",

        // Transitions
        "transition-transform duration-300",

        // Conditional classes
        isVisible ? "translate-x-0" : "-translate-x-40 md:translate-x-40"
      )}
    >
      {theme === "dark" ? (
        <FaSun className="h-5 w-5 text-text-light" />
      ) : (
        <FaMoon className="h-5 w-5 text-text-dark" />
      )}
    </button>
  );
}
