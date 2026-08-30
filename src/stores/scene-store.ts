import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import { QUALITY_PRESETS, type QualitySettings, type QualityTier } from "@/config/quality";
import type { DeviceCapabilities, RenderBackend } from "@/lib/capabilities";

export type SceneStatus = "booting" | "loading" | "ready" | "failed";

interface SceneState {
  status: SceneStatus;
  backend: RenderBackend;
  capabilities: DeviceCapabilities | null;
  /** Asset load progress in `[0, 1]`, driven by the drei loading manager. */
  progress: number;
  qualityTier: QualityTier;
  /** Set when a tier is pinned explicitly, which disables adaptive changes. */
  qualityLocked: boolean;
  /** Honoured by every animation system; mirrors `prefers-reduced-motion`. */
  reducedMotion: boolean;
  errorMessage: string | null;
}

interface SceneActions {
  setStatus: (status: SceneStatus) => void;
  setProgress: (progress: number) => void;
  setCapabilities: (capabilities: DeviceCapabilities) => void;
  setQualityTier: (tier: QualityTier, options?: { lock?: boolean }) => void;
  /** Hands control back to the adaptive controller, or takes it away. */
  setQualityLocked: (locked: boolean) => void;
  setReducedMotion: (reducedMotion: boolean) => void;
  fail: (message: string) => void;
}

export type SceneStore = SceneState & SceneActions;

const initialState: SceneState = {
  status: "booting",
  backend: "unsupported",
  capabilities: null,
  progress: 0,
  qualityTier: "medium",
  qualityLocked: false,
  reducedMotion: false,
  errorMessage: null,
};

export const useSceneStore = create<SceneStore>()(
  subscribeWithSelector((set) => ({
    ...initialState,

    setStatus: (status) => {
      set({ status });
    },

    setProgress: (progress) => {
      set({ progress });
    },

    setCapabilities: (capabilities) => {
      set({
        capabilities,
        backend: capabilities.backend,
        reducedMotion: capabilities.prefersReducedMotion,
      });
    },

    setQualityTier: (tier, options) => {
      set((state) =>
        // An explicit user choice wins; adaptive callers pass no options and are ignored once locked.
        state.qualityLocked && !options?.lock
          ? state
          : { qualityTier: tier, qualityLocked: options?.lock ?? state.qualityLocked }
      );
    },

    setQualityLocked: (qualityLocked) => {
      set({ qualityLocked });
    },

    setReducedMotion: (reducedMotion) => {
      set({ reducedMotion });
    },

    fail: (message) => {
      set({ status: "failed", errorMessage: message });
    },
  }))
);

/** Resolves the active tier to its concrete settings. */
export function selectQualitySettings(state: SceneStore): QualitySettings {
  return QUALITY_PRESETS[state.qualityTier];
}

export const useQualitySettings = (): QualitySettings => useSceneStore(selectQualitySettings);
