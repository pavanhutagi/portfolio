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
        "rounded-[15px] p-3 sm:p-4",
        disabled
          ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-text-secondary dark:text-text-secondaryDark"
          : "bg-primary-400 hover:bg-primary-500 text-text-light",
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
