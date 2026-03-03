"use client";

import { RiRobot2Fill } from "react-icons/ri";

export default function ChatHeader() {
  return (
    <div className="bg-primary-400 p-4 flex items-center gap-4">
      <RiRobot2Fill size={36} className="text-text-primary shrink-0" />
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold text-text-primary">Chat with Me</h3>
        <p className="text-sm text-text-primary/80">AI-powered, speaks just like me</p>
      </div>
    </div>
  );
}
