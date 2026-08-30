"use client";

import { useEffect } from "react";

import { frameState } from "@/stores/frame-state";

/**
 * Tracks the pointer straight into the frame buffer.
 *
 * The listener writes two numbers and returns. Deliberately no React state: a
 * `setState` here would re-render the tree on every mouse move, which is the
 * classic way to turn a 120 FPS scene into a 30 FPS one. Coarse pointers are
 * ignored, since on touch devices `pointermove` only fires mid-drag and would make
 * the parallax lurch.
 */
export function PointerProvider() {
  useEffect(() => {
    if (matchMedia("(hover: none)").matches) return;

    const onPointerMove = (event: PointerEvent) => {
      frameState.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      frameState.pointerY = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    const onPointerLeave = () => {
      frameState.pointerX = 0;
      frameState.pointerY = 0;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return null;
}
