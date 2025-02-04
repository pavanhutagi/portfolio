"use client";

import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { useIdleVisibility } from "@/hooks/useIdleVisibility";
import { useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  const isVisible = useIdleVisibility();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      className={`bg-[#D4D4D4] rounded-full w-[50px] h-[50px] flex items-center justify-center fixed top-6 right-6 sm:top-8 sm:right-8 lg:top-10 lg:right-10 transition-all duration-300 z-50 ${
        isVisible ? "translate-x-0" : "translate-x-40"
      }`}
      onClick={toggleTheme}
    >
      {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
    </button>
  );
}
