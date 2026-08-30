"use client";

import { MotionConfig } from "motion/react";

import { useSceneStore } from "@/stores/scene-store";

import { PointerProvider } from "./pointer-provider";
import { SmoothScrollProvider } from "./smooth-scroll-provider";

/**
 * Single client boundary for the app.
 *
 * `MotionConfig` propagates the reduced-motion decision to every Motion component
 * at once, so individual components never have to remember to check it.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  const reducedMotion = useSceneStore((state) => state.reducedMotion);

  return (
    <MotionConfig reducedMotion={reducedMotion ? "always" : "user"}>
      <SmoothScrollProvider>
        <PointerProvider />
        {children}
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
