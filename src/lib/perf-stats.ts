/**
 * Live performance counters.
 *
 * A plain mutable object for the same reason as `frameState`: these values change
 * every frame, and a performance monitor that itself re-renders React 60 times a
 * second would distort the very thing it is trying to measure. The sampler writes
 * here in the render loop; the HUD polls a few times a second to display it.
 */
export interface PerfStats {
  fps: number;
  /** Mean CPU frame time over the sampling window, in milliseconds. */
  frameMs: number;
  /** Worst frame time in the window — the number that actually correlates with visible jank. */
  worstFrameMs: number;
  drawCalls: number;
  triangles: number;
  geometries: number;
  textures: number;
  backend: string;
  qualityTier: string;
}

export const perfStats: PerfStats = {
  fps: 0,
  frameMs: 0,
  worstFrameMs: 0,
  drawCalls: 0,
  triangles: 0,
  geometries: 0,
  textures: 0,
  backend: "unknown",
  qualityTier: "medium",
};
