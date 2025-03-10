"use client";

import clsx from "clsx";

import Social from "./social";

export default function FooterSection() {
  return (
    <footer
      id="footer"
      className={clsx(
        // Layout
        "flex flex-col items-center w-[90%] max-w-[1400px]",
        // Spacing
        "gap-8 pt-10 pb-20 sm:pb-40",
        // Appearance
        "bg-[#414141] rounded-t-[50px]"
      )}
    >
      <Social />
    </footer>
  );
}
