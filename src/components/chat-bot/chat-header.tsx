"use client";

import { RiRobot2Fill } from "react-icons/ri";

export default function ChatHeader() {
  return (
    <div className="flex items-center gap-4 border-b border-primary-500/40 bg-secondary-800/90 p-4">
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center border border-primary-500/60 bg-secondary-900 text-primary-400 clip-corner-sm">
        <RiRobot2Fill size={26} />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-success-500 animate-neon-breathe" />
      </div>
      <div className="flex flex-col">
        <h3 className="font-display text-base font-bold uppercase tracking-wider text-text-primaryDark">
          Chat with <span className="neon-cyan">Pavan.AI</span>
        </h3>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-400">
          Online // speaks just like me
        </p>
      </div>
    </div>
  );
}
