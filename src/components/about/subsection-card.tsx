"use client";

import React from "react";

import clsx from "clsx";

import type { SubsectionCardProps } from "@/types/about";

export const SubsectionCard = ({ icon, title, description, onCardClick }: SubsectionCardProps) => {
  return (
    <div
      className={clsx(
        "group relative cursor-pointer overflow-hidden clip-corner-sm",
        "border border-secondary-400/40 bg-secondary-800/60",
        "p-4",
        "flex flex-col gap-3",
        "transition-all duration-300",
        "hover:border-primary-500/80 hover:bg-secondary-800/90 hover:glow-cyan"
      )}
      onClick={onCardClick}
    >
      {/* Scan hover sheen */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-primary-500/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <div className="flex items-center gap-3">
        <div
          className={clsx(
            "flex h-9 w-9 items-center justify-center",
            "border border-primary-500/50 bg-secondary-900/80 text-lg",
            "transition-all duration-300 group-hover:border-accent-500/70"
          )}
        >
          <span>{icon}</span>
        </div>
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-text-primaryDark">
          {title}
        </h3>
      </div>
      <p className="text-xs leading-relaxed text-text-secondaryDark">{description}</p>
      <span className="mt-auto font-mono text-[10px] uppercase tracking-[0.3em] text-primary-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        access →
      </span>
    </div>
  );
};
