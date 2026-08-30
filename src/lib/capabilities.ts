import type { QualityTier } from "@/config/quality";

export type RenderBackend = "webgpu" | "webgl2" | "unsupported";

export interface DeviceCapabilities {
  backend: RenderBackend;
  isMobile: boolean;
  /** `navigator.deviceMemory` is not universal; falls back to a conservative guess. */
  memoryGb: number;
  cores: number;
  prefersReducedMotion: boolean;
  maxTextureSize: number;
}

/**
 * WebGPU adapter probe.
 *
 * `navigator.gpu` existing is not sufficient — Linux and older Android builds
 * expose the object but fail to hand out an adapter. Only a successful
 * `requestAdapter()` proves the backend is actually usable, so this is async and
 * resolved once during boot rather than read synchronously at render time.
 */
export async function detectBackend(): Promise<RenderBackend> {
  if (typeof navigator === "undefined") return "unsupported";

  if ("gpu" in navigator) {
    try {
      const adapter = await navigator.gpu.requestAdapter({ powerPreference: "high-performance" });
      if (adapter) return "webgpu";
    } catch {
      // Fall through to the WebGL2 probe.
    }
  }

  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2");
    if (context) {
      context.getExtension("WEBGL_lose_context")?.loseContext();
      return "webgl2";
    }
  } catch {
    // Ignore and report unsupported.
  }

  return "unsupported";
}

function readMaxTextureSize(): number {
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2");
    if (!context) return 2048;
    const size = context.getParameter(context.MAX_TEXTURE_SIZE) as number;
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return size;
  } catch {
    return 2048;
  }
}

export async function detectCapabilities(): Promise<DeviceCapabilities> {
  const backend = await detectBackend();

  const isMobile =
    typeof matchMedia === "function"
      ? matchMedia("(hover: none) and (pointer: coarse)").matches
      : false;

  const prefersReducedMotion =
    typeof matchMedia === "function"
      ? matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const nav = navigator as Navigator & { deviceMemory?: number };

  return {
    backend,
    isMobile,
    memoryGb: nav.deviceMemory ?? (isMobile ? 4 : 8),
    cores: navigator.hardwareConcurrency || 4,
    prefersReducedMotion,
    maxTextureSize: readMaxTextureSize(),
  };
}

/**
 * Picks the starting quality tier.
 *
 * This is deliberately pessimistic: starting low and letting the adaptive
 * controller climb produces a smooth first impression, whereas starting high
 * and stuttering for two seconds does not.
 */
export function recommendTier(capabilities: DeviceCapabilities): QualityTier {
  const { backend, isMobile, cores, memoryGb, prefersReducedMotion } = capabilities;

  if (backend === "unsupported" || prefersReducedMotion) return "low";
  if (isMobile) return cores >= 8 && memoryGb >= 6 ? "medium" : "low";
  if (backend === "webgpu" && cores >= 8 && memoryGb >= 8) return "high";
  if (cores >= 4) return "medium";
  return "low";
}
