import React from "react";

import type { SubsectionCardProps } from "@/types/about";

/**
 * Card component for each subsection in the About section
 */
export const SubsectionCard = ({ icon, title, description, onCardClick }: SubsectionCardProps) => {
  return (
    <div
      className="bg-gray-800 dark:bg-gray-200 p-3 rounded-2xl flex flex-col gap-3 cursor-pointer transition-all duration-300 relative group"
      onClick={onCardClick}
    >
      {/* Inner border that appears on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-secondary-400 transition-all duration-300"></div>

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
