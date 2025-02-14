import { useEffect, useState } from "react";

export function useIdleVisibility(idleTime: number = 3000) {
  const [isVisible, setIsVisible] = useState(true);
  let timeoutId: NodeJS.Timeout;

  useEffect(() => {
    const handleMouseMove = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      setIsVisible(true);

      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, idleTime);
    };

    document.addEventListener("mousemove", handleMouseMove);

    timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, idleTime);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [idleTime]);

  return isVisible;
}
