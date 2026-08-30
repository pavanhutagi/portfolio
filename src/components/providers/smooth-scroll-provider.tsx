"use client";

import { useEffect } from "react";

import { destroySmoothScroll, initSmoothScroll } from "@/lib/smooth-scroll";
import { useSceneStore } from "@/stores/scene-store";

/**
 * Owns the Lenis lifecycle and keeps it in step with `prefers-reduced-motion`.
 *
 * Reduced motion is watched live rather than read once, because the OS setting can
 * change while the page is open and a portfolio that ignores that is inaccessible.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useSceneStore((state) => state.reducedMotion);
  const setReducedMotion = useSceneStore((state) => state.setReducedMotion);

  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    query.addEventListener("change", onChange);
    return () => {
      query.removeEventListener("change", onChange);
    };
  }, [setReducedMotion]);

  useEffect(() => {
    initSmoothScroll({ reducedMotion });
    return () => {
      destroySmoothScroll();
    };
  }, [reducedMotion]);

  return children;
}
