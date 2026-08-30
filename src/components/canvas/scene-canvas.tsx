"use client";

import { Suspense, useEffect, useMemo, useState } from "react";

import { Canvas } from "@react-three/fiber";

import { QUALITY_PRESETS } from "@/config/quality";
import { detectCapabilities, recommendTier } from "@/lib/capabilities";
import { readQualityOverride } from "@/lib/quality-override";
import { createRendererFactory } from "@/lib/renderer";
import { frameState } from "@/stores/frame-state";
import { useSceneStore } from "@/stores/scene-store";

import { AdaptiveQuality } from "./adaptive-quality";
import { FrameClock } from "./frame-clock";
import { PerfSampler } from "./perf-sampler";
import { RenderPipeline } from "./render-pipeline";
import { SceneReadySignal } from "./scene-ready-signal";

interface SceneCanvasProps {
  children: React.ReactNode;
}

/**
 * Owns the single WebGPU canvas for the whole site.
 *
 * The canvas is fixed behind the document and never unmounts, so the renderer,
 * compiled pipelines and uploaded GPU resources survive every scroll and route
 * change. Mounting is gated on capability detection because the renderer needs to
 * know up front whether to force the WebGL2 backend — recreating it afterwards
 * would throw away every compiled shader.
 */
export function SceneCanvas({ children }: SceneCanvasProps) {
  const setCapabilities = useSceneStore((state) => state.setCapabilities);
  const setQualityTier = useSceneStore((state) => state.setQualityTier);
  const setStatus = useSceneStore((state) => state.setStatus);
  const fail = useSceneStore((state) => state.fail);

  const backend = useSceneStore((state) => state.backend);
  const qualityTier = useSceneStore((state) => state.qualityTier);
  const [probed, setProbed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void detectCapabilities().then((capabilities) => {
      if (cancelled) return;

      setCapabilities(capabilities);

      if (capabilities.backend === "unsupported") {
        fail("This browser cannot render WebGL2 or WebGPU.");
        return;
      }

      // A pinned tier from the URL wins over the capability-based guess, and locks
      // out the adaptive controller so the chosen tier is what actually gets seen.
      const override = readQualityOverride(window.location.search);
      if (override) setQualityTier(override, { lock: true });
      else setQualityTier(recommendTier(capabilities));

      setStatus("loading");
      setProbed(true);
    });

    return () => {
      cancelled = true;
    };
  }, [setCapabilities, setQualityTier, setStatus, fail]);

  // Parking the render loop on a hidden tab is the single cheapest performance
  // win available: a backgrounded scene otherwise keeps the GPU busy for nothing.
  useEffect(() => {
    const onVisibility = () => {
      frameState.hidden = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility, { passive: true });
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const settings = QUALITY_PRESETS[qualityTier];

  // Only the tier chosen at mount time can influence renderer construction.
  // Later tier changes adjust DPR and effects instead of rebuilding the renderer.
  const glFactory = useMemo(
    () =>
      createRendererFactory({
        forceWebGL: backend !== "webgpu",
        // A post-processing AA pass supersedes MSAA; running both wastes fill rate.
        antialias: settings.antiAlias === "none",
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally frozen after the first successful probe
    [backend, probed]
  );

  if (!probed) return null;

  return (
    <Canvas
      gl={glFactory}
      dpr={settings.dpr}
      shadows={settings.shadows}
      // The camera rig writes position/quaternion/fov directly every frame.
      camera={{ fov: 42, near: 0.1, far: 120, position: [0, 0.6, 9], manual: false }}
      // `demand` would stall scroll-driven motion; the loop is instead parked via
      // the visibility flag, and `FrameClock` skips work while hidden.
      frameloop="always"
      // Events are attached to the overlay instead of the canvas so DOM UI stays
      // clickable; the canvas itself is inert to pointer input.
      eventSource={typeof document === "undefined" ? undefined : document.body}
      eventPrefix="client"
      className="!fixed inset-0 -z-10"
      style={{ position: "fixed", inset: 0, zIndex: -10 }}
      onCreated={() => {
        setStatus("ready");
      }}
    >
      <FrameClock />
      <AdaptiveQuality />

      <Suspense fallback={null}>
        {children}
        <SceneReadySignal />
      </Suspense>

      <RenderPipeline />
      <PerfSampler />
    </Canvas>
  );
}
