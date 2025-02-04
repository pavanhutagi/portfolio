import { useEffect, useState } from "react";

export function useIdleVisibility(idleTime: number = 3000) {
  const [isVisible, setIsVisible] = useState(true);
  let timeoutId: NodeJS.Timeout;

  useEffect(() => {
    const handleMouseMove = () => {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Show the elements
      setIsVisible(true);

      // Set a new timeout
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, idleTime);
    };

    // Add event listener
    document.addEventListener("mousemove", handleMouseMove);

    // Initial timeout
    timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, idleTime);

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [idleTime]);

  return isVisible;
}
