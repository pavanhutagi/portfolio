"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import { useAppContext } from "@/context/app-context";
import { useIdleVisibility } from "@/hooks/idle-visibility";

export default function ScrollControl() {
  const isVisible = useIdleVisibility();
  const [isAtTop, setIsAtTop] = useState(true);
  const { isMenuOpen } = useAppContext();

  // Using clsx to organize visibility classes
  const visibilityClass = clsx({
    "translate-x-0": isMenuOpen || isVisible,
    "translate-x-40": !isMenuOpen && !isVisible,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const isTop = scrollTop < 100;
      setIsAtTop(isTop);
    };

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
      className={clsx(
        // Base styles
        "fixed z-50 flex items-center justify-center rounded-full transition-transform duration-300",

        // Styling
        "bg-background-elevatedDark dark:bg-background-elevated",
        "text-text-primaryDark dark:text-text-primary",
        "drop-shadow-[0_0_4px_rgba(0,0,0,0.2)]",

        // Responsive sizing
        "w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px]",

        // Positioning
        "bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10",

        // Visibility state
        visibilityClass
      )}
    >
      {isAtTop ? (
        <FaArrowDown size={20} className="text-text-dark dark:text-text-light" />
      ) : (
        <FaArrowUp size={20} className="text-text-dark dark:text-text-light" />
      )}
    </button>
  );
}
