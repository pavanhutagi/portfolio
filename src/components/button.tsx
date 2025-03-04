"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ children, onClick, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[15px] p-3 sm:p-4 ${
        disabled
          ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
          : "bg-[#a82121] dark:bg-[#f34848] hover:bg-[#dc3b3b] dark:hover:bg-[#c44848] text-text-dark dark:text-text-light"
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
