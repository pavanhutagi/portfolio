"use client";

import { useCallback, useRef } from "react";

import { PerformanceMonitor } from "@react-three/drei";

import { PERFORMANCE_TARGET, nextTierDown, nextTierUp } from "@/config/quality";
import { useSceneStore } from "@/stores/scene-store";

/**
 * Closed-loop quality control.
 *
 * A fixed quality preset is a guess; measured frame rate is not. drei's
 * `PerformanceMonitor` reports a normalised factor derived from actual frame
 * timings, and this component steps the tier up or down in response.
 *
 * Two details keep it from thrashing. First, a change only commits after the
 * signal has held for `settleSeconds`, so a single janky frame during asset
 * decode does not permanently downgrade the scene. Second, the upgrade threshold
 * sits well above the downgrade threshold, giving the controller hysteresis
 * instead of letting it oscillate between two tiers forever.
 */
export function AdaptiveQuality() {
  const declineSince = useRef<number | null>(null);
  const inclineSince = useRef<number | null>(null);

  const handleDecline = useCallback(() => {
    inclineSince.current = null;
    const now = performance.now();
    declineSince.current ??= now;

    if (now - declineSince.current < PERFORMANCE_TARGET.settleSeconds * 1000) return;
    declineSince.current = null;

    const { qualityTier, qualityLocked, setQualityTier } = useSceneStore.getState();
    if (qualityLocked) return;

    const downgraded = nextTierDown(qualityTier);
    if (downgraded !== qualityTier) setQualityTier(downgraded);
  }, []);

  const handleIncline = useCallback(() => {
    declineSince.current = null;
    const now = performance.now();
    inclineSince.current ??= now;

    if (now - inclineSince.current < PERFORMANCE_TARGET.settleSeconds * 1000) return;
    inclineSince.current = null;

    const { qualityTier, qualityLocked, setQualityTier } = useSceneStore.getState();
    if (qualityLocked) return;

    const upgraded = nextTierUp(qualityTier);
    if (upgraded !== qualityTier) setQualityTier(upgraded);
  }, []);

  return (
    <PerformanceMonitor
      bounds={() => [PERFORMANCE_TARGET.degradeBelow * 60, PERFORMANCE_TARGET.upgradeAbove * 60]}
      // Averaging window. The defaults (10 iterations × 250ms) take ~2.5s to produce
      // a first verdict, which is a long time to sit at an unplayable frame rate on
      // weak hardware. Six shorter samples reach a decision in well under a second
      // while still averaging away individual bad frames.
      ms={150}
      iterations={6}
      flipflops={4}
      onDecline={handleDecline}
      onIncline={handleIncline}
      // After six direction changes the device is clearly borderline; pin the tier
      // rather than keep re-tuning and causing visible quality pops.
      onFallback={() => {
        const { qualityTier, setQualityTier } = useSceneStore.getState();
        setQualityTier(nextTierDown(qualityTier), { lock: true });
      }}
    />
  );
}
