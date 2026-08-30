"use client";

import { useEffect } from "react";

import { useThree } from "@react-three/fiber";

import { useSceneStore } from "@/stores/scene-store";

/**
 * Marks the scene ready once Suspense has resolved and one frame has been drawn.
 *
 * Placed inside the Suspense boundary so it cannot mount until every asset the
 * scene suspended on has loaded. Waiting an extra frame past that means the
 * intro overlay only lifts after real pixels exist, avoiding a flash of an empty
 * canvas.
 */
export function SceneReadySignal() {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      useSceneStore.getState().setStatus("ready");
      useSceneStore.getState().setProgress(1);
      invalidate();
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [invalidate]);

  return null;
}
