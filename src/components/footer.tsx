"use client";

import clsx from "clsx";

import Social from "./social";

export default function FooterSection() {
  return (
    <footer
      id="footer"
      className={clsx(
        "relative flex w-[92%] max-w-[1400px] flex-col items-center overflow-hidden clip-corner",
        "gap-6 pt-12 pb-24 sm:pb-40",
        "border-t-2 border-primary-500/60 bg-secondary-900/70 backdrop-blur-md"
      )}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary-400">
        // End of transmission
      </span>

      <Social />

      <p className="font-mono text-xs text-text-secondaryDark">
        © {new Date().getFullYear()} Pavan Hutagi — Crafted in the neon glow
      </p>
    </footer>
  );
}
