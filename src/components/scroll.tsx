"use client";

import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";

import { useIdleVisibility } from "@/hooks/idle-visibility";

export default function Scroll() {
  const isVisible = useIdleVisibility();
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const isTop = scrollTop < 100; // Consider "top" when scrolled less than 100px
      setIsAtTop(isTop);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={isAtTop ? scrollToBottom : scrollToTop}
      className={`bg-dark-background dark:bg-background rounded-full w-[50px] h-[50px] flex items-center justify-center fixed bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10 transition-transform duration-300 z-50 ${
        isVisible ? "translate-x-0" : "translate-x-40"
      }`}
    >
      {isAtTop ? (
        <FaArrowDown size={20} className="text-dark-text dark:text-text" />
      ) : (
        <FaArrowUp size={20} className="text-dark-text dark:text-text" />
      )}
    </button>
  );
}
