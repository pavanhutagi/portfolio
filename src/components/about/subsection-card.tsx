"use client";

import React from "react";

import clsx from "clsx";

import type { SubsectionCardProps } from "@/types/about";

export const SubsectionCard = ({ icon, title, description, onCardClick }: SubsectionCardProps) => {
  return (
    <div
      className={clsx(
        // Card container styles
        "bg-gray-800 dark:bg-gray-300",
        "p-3 rounded-2xl",
        "flex flex-col gap-3",
        "cursor-pointer",
        "transition-all duration-300",
        "relative group"
      )}
      onClick={onCardClick}
    >
      <div
        className={clsx(
          // Hover border effect
          "absolute inset-0 rounded-2xl",
          "border-2 border-transparent",
          "group-hover:border-secondary-400",
          "transition-all duration-300"
        )}
      ></div>

      <div className={clsx("flex items-center gap-2")}>
        <div
          className={clsx(
            // Icon container
            "w-8 h-8 rounded-full bg-white",
            "flex items-center justify-center"
          )}
        >
          <span className="text-l">{icon}</span>
        </div>
        <h3 className="font-bold text-text-primaryDark dark:text-text-primary">{title}</h3>
      </div>
      <p className="text-sm text-text-primaryDark dark:text-text-primary">{description}</p>
    </div>
  );
};
