import Lenis from "lenis";

import { frameState } from "@/stores/frame-state";

let instance: Lenis | null = null;
let fallbackRaf = 0;
/** True once the render loop has taken over ticking, so the fallback loop stands down. */
let claimedByRenderLoop = false;

function writeFrameState(scroll: number, progress: number, velocity: number): void {
  frameState.scrollY = scroll;
  frameState.scrollProgress = Number.isFinite(progress) ? progress : 0;
  frameState.scrollVelocity = velocity;
}

function startFallbackLoop(): void {
  if (fallbackRaf || claimedByRenderLoop) return;

  const tick = (time: number) => {
    instance?.raf(time);
    fallbackRaf = requestAnimationFrame(tick);
  };

  fallbackRaf = requestAnimationFrame(tick);
}

function stopFallbackLoop(): void {
  if (!fallbackRaf) return;
  cancelAnimationFrame(fallbackRaf);
  fallbackRaf = 0;
}

/**
 * Creates the smooth-scroll controller.
 *
 * `autoRaf` is off on purpose. Lenis running its own animation frame would leave
 * the order of "update scroll" versus "render the scene" up to whichever callback
 * the browser happens to invoke first, which shows up as the 3D camera trailing the
 * DOM by a frame. Instead the render loop ticks Lenis explicitly (see
 * `claimScrollDriver`), guaranteeing scroll is current before anything reads it.
 *
 * A self-driven fallback loop covers the case where no canvas mounts at all, so
 * scrolling still works on unsupported hardware.
 */
export function initSmoothScroll(options: { reducedMotion: boolean }): Lenis {
  instance?.destroy();

  instance = new Lenis({
    autoRaf: false,
    // Interpolation factor per frame. Lower is heavier; this sits just short of
    // feeling laggy while still absorbing trackpad jitter.
    lerp: options.reducedMotion ? 1 : 0.085,
    smoothWheel: !options.reducedMotion,
    // Native touch scrolling is already smooth and hardware-accelerated;
    // hijacking it costs performance and fights platform expectations.
    syncTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
    autoResize: true,
  });

  instance.on("scroll", (lenis) => {
    writeFrameState(lenis.scroll, lenis.progress, lenis.velocity);
  });

  writeFrameState(instance.scroll, instance.progress, 0);
  startFallbackLoop();

  return instance;
}

export function destroySmoothScroll(): void {
  stopFallbackLoop();
  claimedByRenderLoop = false;
  instance?.destroy();
  instance = null;
}

/** Hands ticking responsibility to the render loop and returns the tick function. */
export function claimScrollDriver(): (timeMs: number) => void {
  claimedByRenderLoop = true;
  stopFallbackLoop();
  return (timeMs: number) => {
    instance?.raf(timeMs);
  };
}

/** Returns ticking to the standalone loop, e.g. when the canvas unmounts. */
export function releaseScrollDriver(): void {
  claimedByRenderLoop = false;
  startFallbackLoop();
}

export function getSmoothScroll(): Lenis | null {
  return instance;
}
