"use client";

import { useRef } from "react";

import { useFrame, useThree } from "@react-three/fiber";

import { perfStats } from "@/lib/perf-stats";
import { describeBackend } from "@/lib/renderer";
import { useSceneStore } from "@/stores/scene-store";

/** Sampling window. Long enough to be stable, short enough to react to a stall. */
const WINDOW_MS = 500;

/**
 * Measures real frame timings from inside the render loop.
 *
 * Reports mean *and* worst frame time in each window. Mean FPS alone hides jank —
 * a second containing 59 frames at 8ms and one at 120ms still averages to a
 * respectable number while looking visibly broken, so the peak is the useful
 * signal when tuning.
 *
 * Priority `2` puts this after the render pipeline at priority 1, so the draw-call
 * and triangle counts it reads belong to the frame that was just drawn.
 */
export function PerfSampler() {
  const renderer = useThree((state) => state.gl);

  const windowStart = useRef(0);
  const frames = useRef(0);
  const accumulated = useRef(0);
  const worst = useRef(0);
  const lastFrameAt = useRef(0);

  useFrame(() => {
    const now = performance.now();

    if (lastFrameAt.current !== 0) {
      const elapsed = now - lastFrameAt.current;
      frames.current += 1;
      accumulated.current += elapsed;
      worst.current = Math.max(worst.current, elapsed);
    }
    lastFrameAt.current = now;

    if (windowStart.current === 0) windowStart.current = now;
    const windowElapsed = now - windowStart.current;
    if (windowElapsed < WINDOW_MS || frames.current === 0) return;

    const info = (renderer as unknown as { info?: PartialInfo }).info;

    perfStats.fps = Math.round((frames.current / windowElapsed) * 1000);
    perfStats.frameMs = Number((accumulated.current / frames.current).toFixed(2));
    perfStats.worstFrameMs = Number(worst.current.toFixed(2));
    perfStats.drawCalls = info?.render.drawCalls ?? 0;
    perfStats.triangles = info?.render.triangles ?? 0;
    perfStats.geometries = info?.memory.geometries ?? 0;
    perfStats.textures = info?.memory.textures ?? 0;
    perfStats.backend = describeBackend(renderer as never);
    perfStats.qualityTier = useSceneStore.getState().qualityTier;

    windowStart.current = now;
    frames.current = 0;
    accumulated.current = 0;
    worst.current = 0;
  }, 2);

  return null;
}

interface PartialInfo {
  render: { drawCalls: number; triangles: number };
  memory: { geometries: number; textures: number };
}
