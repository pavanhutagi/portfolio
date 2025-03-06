"use client";

import React from "react";

import type { DetailPopupProps } from "@/types/about";

export const DetailPopup = ({ icon, title, onClose, children }: DetailPopupProps) => {
  return (
    <div className="absolute inset-0 bg-background-dark dark:bg-background-light z-10 flex flex-col h-full overflow-hidden p-4">
      <div className="flex justify-between items-center p-4 border-b border-gray-600 dark:border-gray-400">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-xl">{icon}</span>
          </div>
          <h2 className="text-2xl font-bold text-text-dark dark:text-text-light">{title}</h2>
        </div>

        <button
          onClick={onClose}
          className="bg-gray-700 dark:bg-gray-400 text-text-dark dark:text-text-light p-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-500 transition-colors"
          aria-label="Close details"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
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

      <div className="flex-1 overflow-y-auto p-4 mt-4 mb-4 text-text-dark dark:text-text-light flex">
        <div className="w-full flex">{children}</div>
      </div>
    </div>
  );
};
