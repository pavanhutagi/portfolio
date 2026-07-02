"use client";

import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Button({ children, onClick, disabled, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "group relative overflow-hidden clip-corner-sm",
        "px-6 py-3 font-mono text-sm font-semibold uppercase tracking-[0.2em]",
        "border transition-all duration-300",
        disabled
          ? "cursor-not-allowed border-secondary-400/40 bg-secondary-800/60 text-text-disabledDark"
          : "border-primary-500 bg-primary-500/10 text-primary-300 hover:bg-primary-500/20 hover:glow-cyan hover:text-primary-100",
        className
      )}
      disabled={disabled}
    >
      {!disabled && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-primary-500/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
