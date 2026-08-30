import { describe, expect, it } from "vitest";

import {
  PERFORMANCE_TARGET,
  QUALITY_PRESETS,
  QUALITY_TIERS,
  nextTierDown,
  nextTierUp,
} from "./quality";

describe("QUALITY_PRESETS", () => {
  it("defines a preset for every tier", () => {
    for (const tier of QUALITY_TIERS) {
      expect(QUALITY_PRESETS[tier]).toBeDefined();
    }
  });

  it("increases cost monotonically with tier", () => {
    // The adaptive controller assumes moving down a tier is always cheaper. If two
    // tiers ever crossed over, dropping a tier could make frame rate worse and the
    // controller would chase itself.
    const counts = QUALITY_TIERS.map((tier) => QUALITY_PRESETS[tier].particleCount);
    expect([...counts].sort((a, b) => a - b)).toEqual(counts);

    const maxDpr = QUALITY_TIERS.map((tier) => QUALITY_PRESETS[tier].dpr[1]);
    expect([...maxDpr].sort((a, b) => a - b)).toEqual(maxDpr);
  });

  it("keeps device pixel ratio capped at 2", () => {
    // Fragment cost scales with the square of DPR, so uncapping this on a 3x phone
    // would quadruple shading work for no perceptible gain.
    for (const tier of QUALITY_TIERS) {
      const [min, max] = QUALITY_PRESETS[tier].dpr;
      expect(min).toBeGreaterThan(0);
      expect(max).toBeLessThanOrEqual(2);
      expect(min).toBeLessThanOrEqual(max);
    }
  });

  it("disables the expensive effects on the lowest tier", () => {
    const low = QUALITY_PRESETS.low;
    expect(low.bloom).toBe(false);
    expect(low.ambientOcclusion).toBe(false);
    expect(low.shadows).toBe(false);
    expect(low.antiAlias).toBe("none");
  });

  it("never enables ambient occlusion without shadows", () => {
    for (const tier of QUALITY_TIERS) {
      const preset = QUALITY_PRESETS[tier];
      if (preset.ambientOcclusion) expect(preset.shadows).toBe(true);
    }
  });
});

describe("tier stepping", () => {
  it("saturates at the ends instead of wrapping", () => {
    expect(nextTierDown("low")).toBe("low");
    expect(nextTierUp("ultra")).toBe("ultra");
  });

  it("steps one tier at a time", () => {
    expect(nextTierUp("low")).toBe("medium");
    expect(nextTierDown("ultra")).toBe("high");
  });

  it("round-trips through the middle tiers", () => {
    expect(nextTierDown(nextTierUp("medium"))).toBe("medium");
  });
});

describe("PERFORMANCE_TARGET", () => {
  it("leaves a hysteresis gap between downgrade and upgrade", () => {
    // Without a gap the controller would oscillate between two tiers forever.
    expect(PERFORMANCE_TARGET.upgradeAbove).toBeGreaterThan(PERFORMANCE_TARGET.degradeBelow);
  });

  it("waits before committing to a tier change", () => {
    expect(PERFORMANCE_TARGET.settleSeconds).toBeGreaterThan(0);
  });
});
