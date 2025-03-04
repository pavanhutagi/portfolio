"use client";

export default function ChatHeader() {
  return (
    <div className="bg-[#4b279e] p-4 flex items-center">
      <div className="bg-[#7C4DFF] p-2 rounded-full mr-3">
        <div className="w-6 h-6 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border-2 border-white"></div>
            <div className="w-1 h-1 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3">
            <div className="w-full h-full border-2 border-t-0 border-white rounded-b-full"></div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white">Virtual Assistant</h3>
        <p className="text-sm text-white text-opacity-80">Ask me anything about our services</p>
      </div>
    </div>
  );
}
