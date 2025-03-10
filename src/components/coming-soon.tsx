import { useEffect, useState } from "react";

import clsx from "clsx";

export default function ComingSoon() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade-in effect
    setIsVisible(true);
  }, []);

  return (
    <div
      className={clsx(
        // Layout
        "flex flex-col items-center justify-center w-full h-full flex-1",
        // Appearance
        "border border-gray-300 dark:border-gray-700 rounded-lg p-8",
        "bg-white dark:bg-gray-800",
        "shadow-md",
        // Animation
        "transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        className={clsx(
          // Position
          "relative",
          // Appearance
          "bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-300 dark:border-gray-700"
        )}
      >
        <h1 className="text-3xl font-bold mb-3 text-primary-600 dark:text-primary-400">
          Coming Soon!
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          This content is currently under development.
        </p>
      </div>
    </div>
  );
}
