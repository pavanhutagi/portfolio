"use client";

import { useEffect, useState } from "react";

import { FaArrowDown, FaArrowUp } from "react-icons/fa";

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
    <div className="invisible opacity-0 transition-all duration-300 md:visible md:opacity-100">
      <button
        onClick={isAtTop ? scrollToBottom : scrollToTop}
        className={`bg-background-dark dark:bg-background-light fixed bottom-6 right-6 z-50 flex h-[50px] w-[50px] items-center justify-center rounded-full transition-transform duration-300 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10 ${
          isVisible ? "translate-x-0" : "translate-x-40"
        }`}
      >
        {isAtTop ? (
          <FaArrowDown
            size={20}
            className="text-text-dark dark:text-text-light"
          />
        ) : (
          <FaArrowUp
            size={20}
            className="text-text-dark dark:text-text-light"
          />
        )}
      </button>
    </div>
  );
}
