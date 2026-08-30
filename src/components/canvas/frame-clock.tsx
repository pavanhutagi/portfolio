"use client";

import { useEffect, useRef } from "react";

import { useFrame } from "@react-three/fiber";

import { damp } from "@/lib/math";
import { claimScrollDriver, releaseScrollDriver } from "@/lib/smooth-scroll";
import { frameState } from "@/stores/frame-state";

/** How quickly the smoothed pointer catches up to the raw one. */
const POINTER_LAMBDA = 5;

/**
 * Single source of per-frame truth.
 *
 * Runs at priority `-1`, ahead of all scene logic, and does two things in a fixed
 * order: ticks smooth scroll, then damps the pointer. Because both happen before
 * anything reads `frameState`, every consumer in the frame sees the same, current
 * values — no consumer is ever a frame behind another.
 *
 * Damping lives here rather than in each consumer so the work happens once and the
 * camera, lighting and particles cannot drift out of sync with each other.
 */
export function FrameClock() {
  const tickScroll = useRef<((timeMs: number) => void) | null>(null);

  useEffect(() => {
    tickScroll.current = claimScrollDriver();
    return () => {
      tickScroll.current = null;
      releaseScrollDriver();
    };
  }, []);

  useFrame((state, delta) => {
    if (frameState.hidden) return;

    // Lenis expects milliseconds; R3F's clock reports seconds.
    tickScroll.current?.(state.clock.elapsedTime * 1000);

    // Clamp delta so a background tab or a long GC pause cannot teleport anything
    // on the frame the page becomes visible again.
    const dt = Math.min(delta, 1 / 30);

    frameState.elapsed += dt;
    frameState.smoothPointerX = damp(
      frameState.smoothPointerX,
      frameState.pointerX,
      POINTER_LAMBDA,
      dt
    );
    frameState.smoothPointerY = damp(
      frameState.smoothPointerY,
      frameState.pointerY,
      POINTER_LAMBDA,
      dt
    );
  }, -1);

  return null;
}
