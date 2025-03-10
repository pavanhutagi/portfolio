"use client";

export default function ChatHeader() {
  return (
    <div className="bg-primary-400 p-4 flex flex-col">
      <h3 className="text-xl font-semibold text-text-primary">Virtual Assistant</h3>
      <p className="text-sm text-opacity-80 text-text-primary">
        Ask me anything about our services
      </p>
    </div>
  );
}
