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

          "rounded-full bg-[#4a4a4a]",
          "text-text-light",
          "drop-shadow-[0_0_4px_rgba(0,0,0,0.2)]",

          "flex items-center justify-center",

          "transition-transform duration-300",

          isVisible ? "translate-x-0" : "translate-x-40",

          "visible opacity-100 md:invisible md:opacity-0",
          isChatOpen && "max-sm:translate-x-40!"
        )}
      >
        <FaBars className="h-5 w-5 text-text-light" />
      </button>

      {isMenuOpen && <Menu />}
    </>
  );
}
