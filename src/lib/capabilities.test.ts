import { describe, expect, it } from "vitest";

import type { DeviceCapabilities } from "./capabilities";
import { recommendTier } from "./capabilities";

function makeCapabilities(overrides: Partial<DeviceCapabilities> = {}): DeviceCapabilities {
  return {
    backend: "webgpu",
    isMobile: false,
    memoryGb: 16,
    cores: 12,
    prefersReducedMotion: false,
    maxTextureSize: 8192,
    ...overrides,
  };
}

describe("recommendTier", () => {
  it("gives a capable desktop the high tier", () => {
    expect(recommendTier(makeCapabilities())).toBe("high");
  });

  it("drops to low when nothing can be rendered", () => {
    expect(recommendTier(makeCapabilities({ backend: "unsupported" }))).toBe("low");
  });

  it("drops to low when the visitor asked for reduced motion", () => {
    expect(recommendTier(makeCapabilities({ prefersReducedMotion: true }))).toBe("low");
  });

  it("caps mobile at medium even with good specs", () => {
    // Phones throttle hard under sustained GPU load, so a high tier that benchmarks
    // fine for two seconds is not sustainable.
    expect(recommendTier(makeCapabilities({ isMobile: true, cores: 8, memoryGb: 8 }))).toBe(
      "medium"
    );
  });

  it("uses low for weaker mobile hardware", () => {
    expect(recommendTier(makeCapabilities({ isMobile: true, cores: 4, memoryGb: 3 }))).toBe("low");
  });

  it("never starts above high, leaving ultra for the adaptive controller to earn", () => {
    const tier = recommendTier(makeCapabilities({ cores: 64, memoryGb: 128 }));
    expect(tier).not.toBe("ultra");
  });

  it("falls back to medium on a WebGL2-only desktop", () => {
    expect(recommendTier(makeCapabilities({ backend: "webgl2", cores: 8 }))).toBe("medium");
  });
});
