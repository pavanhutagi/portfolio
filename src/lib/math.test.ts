import { describe, expect, it } from "vitest";

import { clamp, damp, lerp, mapRange, normalize, smoothstep } from "./math";

describe("clamp", () => {
  it("constrains to the default 0..1 range", () => {
    expect(clamp(-4)).toBe(0);
    expect(clamp(0.42)).toBe(0.42);
    expect(clamp(9)).toBe(1);
  });
});

describe("lerp", () => {
  it("returns the endpoints exactly", () => {
    expect(lerp(2, 10, 0)).toBe(2);
    expect(lerp(2, 10, 1)).toBe(10);
  });
});

describe("damp", () => {
  it("moves toward the target without overshooting", () => {
    const result = damp(0, 10, 5, 1 / 60);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(10);
  });

  it("converges to the same place regardless of frame rate", () => {
    // This is the property the whole feel of the site depends on: a 60Hz display
    // and a 144Hz display must travel the same distance over the same wall-clock
    // time, otherwise camera motion is faster on better hardware.
    const totalSeconds = 0.5;
    const lambda = 6;

    const simulate = (fps: number) => {
      let value = 0;
      const step = 1 / fps;
      for (let elapsed = 0; elapsed < totalSeconds; elapsed += step) {
        value = damp(value, 1, lambda, step);
      }
      return value;
    };

    expect(simulate(144)).toBeCloseTo(simulate(60), 2);
  });

  it("stays put when already at the target", () => {
    expect(damp(5, 5, 8, 1 / 60)).toBe(5);
  });
});

describe("mapRange", () => {
  it("remaps across ranges", () => {
    expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
    expect(mapRange(0, 0, 10, -1, 1)).toBe(-1);
  });

  it("returns the output minimum for a zero-width input range", () => {
    expect(mapRange(3, 2, 2, 7, 9)).toBe(7);
  });
});

describe("normalize", () => {
  it("clamps outside the range", () => {
    expect(normalize(-5, 0, 10)).toBe(0);
    expect(normalize(50, 0, 10)).toBe(1);
    expect(normalize(2.5, 0, 10)).toBe(0.25);
  });
});

describe("smoothstep", () => {
  it("is flat at both edges and centred in the middle", () => {
    expect(smoothstep(0, 1, 0)).toBe(0);
    expect(smoothstep(0, 1, 1)).toBe(1);
    expect(smoothstep(0, 1, 0.5)).toBeCloseTo(0.5, 5);
  });

  it("eases rather than moving linearly", () => {
    expect(smoothstep(0, 1, 0.25)).toBeLessThan(0.25);
    expect(smoothstep(0, 1, 0.75)).toBeGreaterThan(0.75);
  });
});
