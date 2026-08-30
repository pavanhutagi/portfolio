import type { Renderer } from "three/webgpu";

export interface RendererFactoryOptions {
  /** Route through the WebGL2 backend even when WebGPU is present. */
  forceWebGL: boolean;
  /** MSAA. Left off whenever a post-processing anti-alias pass is active, since paying for both is wasteful. */
  antialias: boolean;
}

/**
 * React Three Fiber declares its own local `OffscreenCanvas` interface, which is a
 * distinct type from the DOM one even though the names match. Accepting `unknown`
 * here sidesteps that clash while staying assignable to R3F's `GLProps`.
 */
interface CanvasProps {
  canvas: unknown;
}

/**
 * Builds the async `gl` factory that React Three Fiber hands the canvas to.
 *
 * `WebGPURenderer` is used unconditionally rather than branching to
 * `WebGLRenderer`, because it transparently drives a WebGL2 backend when WebGPU
 * is unavailable. One renderer class means one code path: node materials, TSL and
 * `RenderPipeline` behave identically on both backends, so nothing has to be
 * written twice or feature-detected further down the tree.
 *
 * `three/webgpu` is imported dynamically to keep it out of the initial bundle —
 * the DOM shell and first paint should not wait on the renderer build.
 */
export function createRendererFactory({ forceWebGL, antialias }: RendererFactoryOptions) {
  return async ({ canvas }: CanvasProps): Promise<Renderer> => {
    const { WebGPURenderer } = await import("three/webgpu");

    const renderer = new WebGPURenderer({
      canvas: canvas as HTMLCanvasElement,
      antialias,
      alpha: false,
      powerPreference: "high-performance",
      forceWebGL,
    });

    await renderer.init();

    return renderer;
  };
}

/** Reports which backend the renderer actually negotiated, for the debug HUD. */
export function describeBackend(renderer: Renderer | null): "webgpu" | "webgl2" | "unknown" {
  if (!renderer) return "unknown";
  const backend = (renderer as { backend?: { isWebGPUBackend?: boolean } }).backend;
  if (!backend) return "unknown";
  return backend.isWebGPUBackend ? "webgpu" : "webgl2";
}
