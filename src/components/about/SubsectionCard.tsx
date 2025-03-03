import React from "react";

import type { SubsectionCardProps } from "@/types/about";

/**
 * Card component for each subsection in the About section
 */
export const SubsectionCard = ({ icon, title, description, onCardClick }: SubsectionCardProps) => {
  return (
    <div
      className="bg-gray-800 dark:bg-gray-200 p-3 rounded-2xl flex flex-col gap-3 cursor-pointer hover:shadow-lg transition-all duration-300"
      onClick={onCardClick}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
          <span className="text-l">{icon}</span>
        </div>
        <h3 className="font-bold text-text-dark dark:text-text-light">{title}</h3>
      </div>
      <p className="text-sm text-text-dark dark:text-text-light">{description}</p>
    </div>
  );
};
