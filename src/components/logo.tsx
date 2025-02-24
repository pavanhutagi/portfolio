"use client";

import Image from "next/image";
import Link from "next/link";

import { useIdleVisibility } from "@/hooks/idle-visibility";

export default function Logo() {
  const isVisible = useIdleVisibility();

  return (
    <Link
      href="#"
      className={`fixed left-6 top-6 z-50 transition-all duration-300 sm:left-8 sm:top-8 lg:left-10 lg:top-10 ${
        isVisible ? "translate-x-0" : "-translate-x-40"
      }`}
    >
      <Image
        src="/images/logo.png"
        alt="Avatar"
        className="w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px]"
        width={50}
        height={50}
      />
    </Link>
  );
}
