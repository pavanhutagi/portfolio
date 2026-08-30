"use client";

import { useEffect } from "react";

import { motion, useMotionValue, useSpring } from "motion/react";

import { frameState } from "@/stores/frame-state";

/**
 * Thin scroll progress indicator down the right edge.
 *
 * Reads the frame buffer through a Motion value, which writes straight to the
 * element's transform outside React's render cycle. Combined with `scaleY`, the
 * whole indicator updates without a single React render or layout pass.
 */
export function ScrollProgressRail() {
  const progress = useMotionValue(0);
  const smoothed = useSpring(progress, { stiffness: 260, damping: 40, mass: 0.4 });

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      progress.set(frameState.scrollProgress);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [progress]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-1/2 right-4 z-40 hidden h-40 w-px -translate-y-1/2 bg-hairline sm:block"
    >
      <motion.div className="h-full w-full origin-top bg-accent" style={{ scaleY: smoothed }} />
    </div>
  );
}
