/**
 * Per-frame mutable state.
 *
 * This is intentionally *not* a React store. Scroll offset, pointer position and
 * velocity change every single frame; routing them through `useState` or even a
 * Zustand `set()` would schedule 60–144 React renders per second and is the most
 * common reason R3F portfolios stutter.
 *
 * Instead, producers (Lenis, pointer listeners) write into this singleton and
 * consumers read it inside `useFrame`. Reads and writes are plain property
 * access, so a frame costs no allocations and triggers no reconciliation.
 *
 * Anything a *human* toggles (menu open, quality tier, active section) belongs in
 * the Zustand store instead, where re-rendering is both correct and cheap.
 */
export interface FrameState {
  /** Normalised document scroll progress in `[0, 1]`. */
  scrollProgress: number;
  /** Raw scroll offset in pixels. */
  scrollY: number;
  /** Instantaneous scroll velocity from Lenis, in px/frame. */
  scrollVelocity: number;
  /** Pointer position normalised to `[-1, 1]` on both axes, origin at centre. */
  pointerX: number;
  pointerY: number;
  /** Damped pointer, written by the camera rig so several consumers share one smoothing pass. */
  smoothPointerX: number;
  smoothPointerY: number;
  /** Seconds since the scene started rendering. */
  elapsed: number;
  /** True while the tab is hidden, so the render loop can be parked. */
  hidden: boolean;
}

export const frameState: FrameState = {
  scrollProgress: 0,
  scrollY: 0,
  scrollVelocity: 0,
  pointerX: 0,
  pointerY: 0,
  smoothPointerX: 0,
  smoothPointerY: 0,
  elapsed: 0,
  hidden: false,
};

/** Resets the buffer. Used by tests and on route transitions. */
export function resetFrameState(): void {
  frameState.scrollProgress = 0;
  frameState.scrollY = 0;
  frameState.scrollVelocity = 0;
  frameState.pointerX = 0;
  frameState.pointerY = 0;
  frameState.smoothPointerX = 0;
  frameState.smoothPointerY = 0;
  frameState.elapsed = 0;
  frameState.hidden = false;
}
