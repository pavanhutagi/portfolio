import { useEffect, useState } from "react";

export default function ComingSoon() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade-in effect
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center border border-gray-300 dark:border-gray-700 rounded-lg p-8 w-full h-full flex-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-md transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75 animate-pulse"></div>
        <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
          <h1 className="text-3xl font-bold mb-3 text-blue-600 dark:text-blue-400">Coming Soon!</h1>
          <p className="text-gray-600 dark:text-gray-300">
            This content is currently under development.
          </p>
        </div>
      </div>
    </div>
  );
}
