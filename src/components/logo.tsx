"use client";

import Image from "next/image";
import Link from "next/link";
import { useIdleVisibility } from "@/hooks/useIdleVisibility";

export default function Logo() {
  const isVisible = useIdleVisibility();

  return (
    <Link
      href="#"
      className={`fixed top-6 left-6 sm:top-8 sm:left-8 lg:top-10 lg:left-10 transition-all duration-300 z-50 ${
        isVisible ? "translate-x-0" : "-translate-x-40"
      }`}
    >
      <Image src="/images/logo.png" alt="Avatar" width={50} height={50} />
    </Link>
  );
}
