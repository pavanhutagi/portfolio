"use client";

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
        className={`fixed right-6 top-8 sm:right-8 sm:top-8 z-50 drop-shadow-[0_0_4px_rgba(0,0,0,0.2)] flex w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px] items-center justify-center rounded-full bg-background-dark transition-transform duration-300 dark:bg-background-light ${
          isVisible ? "translate-x-0" : "translate-x-40"
        } visible opacity-100 md:invisible md:opacity-0`}
      >
        <FaBars className="h-5 w-5 text-text-dark dark:text-text-light" />
      </button>

      {isMenuOpen && <Menu />}
    </>
  );
}
