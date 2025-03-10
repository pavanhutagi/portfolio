"use client";

import React from "react";

import clsx from "clsx";

import type { DetailPopupProps } from "@/types/about";

export const DetailPopup = ({ icon, title, onClose, children }: DetailPopupProps) => {
  return (
    <div
      className={clsx(
        "absolute inset-0 z-10 flex flex-col h-full overflow-hidden",
        "p-4",
        "bg-background-dark dark:bg-background-light"
      )}
    >
      <div
        className={clsx(
          "flex justify-between items-center",
          "p-2 sm:p-3 md:p-4",
          "border-b border-gray-600 dark:border-gray-400"
        )}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={clsx(
              "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white",
              "flex items-center justify-center"
            )}
          >
            <span className="text-lg sm:text-xl">{icon}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primaryDark dark:text-text-primary">
            {title}
          </h2>
        </div>

        <button
          onClick={onClose}
          className={clsx(
            "p-1.5 sm:p-2 rounded-full",
            "bg-gray-700 dark:bg-gray-400",
            "text-text-primaryDark dark:text-text-primary",
            "hover:bg-gray-600 dark:hover:bg-gray-500",
            "transition-colors"
          )}
          aria-label="Close details"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div
        className={clsx(
          "flex-1 overflow-y-auto",
          "p-2 sm:p-3 md:p-4",
          "mt-3 mb-3 sm:mt-4 sm:mb-4",
          "text-sm sm:text-base md:text-base",
          "text-text-primaryDark dark:text-text-primary",
          "flex"
        )}
      >
        <div className="w-full flex">{children}</div>
      </div>
    </div>
  );
};
