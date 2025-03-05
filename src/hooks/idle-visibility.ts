import { useEffect, useState } from "react";

import { useAppContext } from "@/context/app-context";

export function useIdleVisibility() {
  const [isVisible, setIsVisible] = useState(true);
  const { isMenuOpen, setIsMenuOpen } = useAppContext();
  const idleTime = isMenuOpen ? 6000 : 3000;

  let timeoutId: NodeJS.Timeout;

  useEffect(() => {
    const handleMouseMove = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      setIsVisible(true);

      timeoutId = setTimeout(() => {
        setIsMenuOpen(false);
        setIsVisible(false);
      }, idleTime);
    };

    document.addEventListener("mousemove", handleMouseMove);

    timeoutId = setTimeout(() => {
      setIsMenuOpen(false);
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
