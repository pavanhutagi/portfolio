"use client";

import React from "react";

import clsx from "clsx";

import type { DetailPopupProps } from "@/types/about";

export const DetailPopup = ({ icon, title, onClose, children }: DetailPopupProps) => {
  return (
    <div
      className={clsx(
        "absolute inset-0 z-10 flex h-full flex-col overflow-hidden",
        "bg-secondary-900/95 backdrop-blur-md",
        "p-4 sm:p-5"
      )}
    >
      <div
        className={clsx(
          "flex items-center justify-between",
          "pb-3 sm:pb-4",
          "border-b border-primary-500/30"
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              "flex h-9 w-9 items-center justify-center sm:h-10 sm:w-10",
              "border border-primary-500/60 bg-secondary-800 text-lg sm:text-xl"
            )}
          >
            <span>{icon}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-400">
              module
            </span>
            <h2 className="font-display text-lg font-bold uppercase tracking-wider text-text-primaryDark sm:text-xl">
              {title}
            </h2>
          </div>
        </div>

        <button
          onClick={onClose}
          className={clsx(
            "flex h-9 w-9 items-center justify-center clip-corner-sm",
            "border border-accent-500/50 bg-secondary-800",
            "text-accent-400",
            "transition-all hover:border-accent-500 hover:glow-magenta"
          )}
          aria-label="Close details"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
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

      <div
        className={clsx(
          "mt-4 flex flex-1 overflow-y-auto custom-scrollbar",
          "pr-1 text-sm sm:text-base",
          "text-text-secondaryDark"
        )}
      >
        <div className="flex w-full">{children}</div>
      </div>
    </div>
  );
};
