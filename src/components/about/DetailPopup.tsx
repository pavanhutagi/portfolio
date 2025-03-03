import React from "react";

import type { DetailPopupProps } from "@/types/about";

/**
 * Popup component for displaying detailed subsection content
 */
export const DetailPopup = ({ icon, title, onClose, children }: DetailPopupProps) => {
  return (
    <div className="absolute inset-0 bg-background-dark dark:bg-background-light z-10 p-6 overflow-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-xl">{icon}</span>
          </div>
          <h2 className="text-2xl font-bold text-text-dark dark:text-text-light">{title}</h2>
        </div>
        <button
          onClick={onClose}
          className="bg-gray-700 dark:bg-gray-300 text-text-dark dark:text-text-light p-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-400 transition-colors"
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
      <div className="text-text-dark dark:text-text-light">{children}</div>
    </div>
  );
};
