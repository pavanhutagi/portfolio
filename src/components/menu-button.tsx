"use client";

import clsx from "clsx";
import { FaBars } from "react-icons/fa";

import Menu from "@/components/menu";
import { useAppContext } from "@/context/app-context";
import { useIdleVisibility } from "@/hooks/idle-visibility";

export default function MenuButton() {
  const isVisible = useIdleVisibility();
  const { isMenuOpen, setIsMenuOpen } = useAppContext();

  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={clsx(
          // Position and z-index
          "fixed z-50 right-6 top-8 sm:right-8 sm:top-8",

          // Dimensions
          "w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px]",

          // Styling
          "rounded-full bg-background-elevatedDark dark:bg-background-elevated",
          "text-text-primaryDark dark:text-text-primary",
          "drop-shadow-[0_0_4px_rgba(0,0,0,0.2)]",

          // Layout
          "flex items-center justify-center",

          // Transitions
          "transition-transform duration-300",

          // Visibility based on idle state
          isVisible ? "translate-x-0" : "translate-x-40",

          // Responsive visibility
          "visible opacity-100 md:invisible md:opacity-0"
        )}
      >
        <FaBars className="h-5 w-5 text-text-dark dark:text-text-light" />
      </button>

      {isMenuOpen && <Menu />}
    </>
  );
}
