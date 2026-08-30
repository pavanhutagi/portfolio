import { beforeEach, describe, expect, it } from "vitest";

import { QUALITY_PRESETS } from "@/config/quality";
import type { DeviceCapabilities } from "@/lib/capabilities";

import { selectQualitySettings, useSceneStore } from "./scene-store";

const capabilities: DeviceCapabilities = {
  backend: "webgpu",
  isMobile: false,
  memoryGb: 16,
  cores: 12,
  prefersReducedMotion: true,
  maxTextureSize: 8192,
};

describe("useSceneStore", () => {
  beforeEach(() => {
    useSceneStore.setState({
      status: "booting",
      backend: "unsupported",
      capabilities: null,
      progress: 0,
      qualityTier: "medium",
      qualityLocked: false,
      reducedMotion: false,
      errorMessage: null,
    });
  });

  it("derives backend and reduced motion from capabilities", () => {
    useSceneStore.getState().setCapabilities(capabilities);

    const state = useSceneStore.getState();
    expect(state.backend).toBe("webgpu");
    expect(state.reducedMotion).toBe(true);
    expect(state.capabilities).toEqual(capabilities);
  });

  it("lets the adaptive controller change tiers while unlocked", () => {
    useSceneStore.getState().setQualityTier("high");
    expect(useSceneStore.getState().qualityTier).toBe("high");
  });

  it("ignores adaptive changes once the tier is locked", () => {
    // A locked tier represents an explicit choice; the adaptive controller must not
    // be able to silently override it.
    useSceneStore.getState().setQualityTier("low", { lock: true });
    useSceneStore.getState().setQualityTier("ultra");

    expect(useSceneStore.getState().qualityTier).toBe("low");
    expect(useSceneStore.getState().qualityLocked).toBe(true);
  });

  it("still honours an explicit change after locking", () => {
    useSceneStore.getState().setQualityTier("low", { lock: true });
    useSceneStore.getState().setQualityTier("ultra", { lock: true });
    expect(useSceneStore.getState().qualityTier).toBe("ultra");
  });

  it("hands control back to the adaptive controller when unlocked", () => {
    useSceneStore.getState().setQualityTier("low", { lock: true });
    useSceneStore.getState().setQualityLocked(false);

    // Unlocking keeps the current tier as the starting point rather than snapping
    // back, so releasing the pin is not itself a visible quality pop.
    expect(useSceneStore.getState().qualityTier).toBe("low");

    useSceneStore.getState().setQualityTier("high");
    expect(useSceneStore.getState().qualityTier).toBe("high");
  });

  it("records a failure reason", () => {
    useSceneStore.getState().fail("no adapter");

    expect(useSceneStore.getState().status).toBe("failed");
    expect(useSceneStore.getState().errorMessage).toBe("no adapter");
  });

  it("resolves the active tier to concrete settings", () => {
    useSceneStore.getState().setQualityTier("ultra");
    expect(selectQualitySettings(useSceneStore.getState())).toEqual(QUALITY_PRESETS.ultra);
  });
});
