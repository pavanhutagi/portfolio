"use client";

import Image from "next/image";
import Link from "next/link";

import clsx from "clsx";

import { useIdleVisibility } from "@/hooks/idle-visibility";

export default function Logo() {
  const isVisible = useIdleVisibility();

  return (
    <Link
      href="#"
      className={clsx(
        // Position classes
        "fixed z-50 transition-all duration-300",

        // Responsive positioning
        "left-6 top-8",
        "sm:left-8 sm:top-8",
        "lg:left-10 lg:top-10",

        // Visibility animation
        isVisible ? "translate-x-0" : "-translate-x-40"
      )}
    >
      <Image
        src="/images/logo.png"
        alt="Avatar"
        className={clsx(
          // Size classes
          "w-[40px] h-[40px]",
          "sm:w-[45px] sm:h-[45px]",
          "lg:w-[50px] lg:h-[50px]",

          // Effects
          "drop-shadow-[0_0_4px_rgba(0,0,0,0.2)]"
        )}
        width={50}
        height={50}
      />
    </Link>
  );
}
