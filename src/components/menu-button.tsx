"use client";

import clsx from "clsx";
import { FaBars } from "react-icons/fa";

import Menu from "@/components/menu";
import { useAppContext } from "@/context/app-context";
import { useIdleVisibility } from "@/hooks/idle-visibility";

export default function MenuButton() {
  const isVisible = useIdleVisibility();
  const { isMenuOpen, setIsMenuOpen, isChatOpen } = useAppContext();

  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={clsx(
          "fixed z-50 right-6 top-8 sm:right-8 sm:top-8",

          "w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px]",

          "rounded-full border border-primary-500/40 bg-secondary-900/80 backdrop-blur-md",
          "text-primary-400",
          "hover:border-primary-500 hover:glow-cyan hover:text-primary-300",

          "flex items-center justify-center",

          "transition-all duration-300",

          isVisible ? "translate-x-0" : "translate-x-40",

          "visible opacity-100 md:invisible md:opacity-0",
          isChatOpen && "max-sm:translate-x-40!"
        )}
      >
        <FaBars className="h-5 w-5" />
      </button>

      {isMenuOpen && <Menu />}
    </>
  );
}
