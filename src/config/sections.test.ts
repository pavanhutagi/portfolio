import { describe, expect, it } from "vitest";

import { SECTIONS, resolveKeyframes, sectionAt } from "./sections";

describe("SECTIONS", () => {
  it("starts at zero so the first frame has a defined camera pose", () => {
    expect(SECTIONS[0].at).toBe(0);
  });

  it("is ordered by scroll position", () => {
    const positions = SECTIONS.map((section) => section.at);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });

  it("keeps every keyframe inside the normalised scroll range", () => {
    for (const section of SECTIONS) {
      expect(section.at).toBeGreaterThanOrEqual(0);
      expect(section.at).toBeLessThanOrEqual(1);
    }
  });

  it("uses unique ids, since they double as DOM anchors", () => {
    const ids = SECTIONS.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("resolveKeyframes", () => {
  it("pins to the first keyframe at or before the start", () => {
    expect(resolveKeyframes(0)).toEqual({
      from: SECTIONS[0],
      to: SECTIONS[0],
      blend: 0,
    });
    expect(resolveKeyframes(-1).from.id).toBe(SECTIONS[0].id);
  });

  it("pins to the last keyframe at or after the end", () => {
    const last = SECTIONS[SECTIONS.length - 1]!;
    expect(resolveKeyframes(1).from.id).toBe(last.id);
    expect(resolveKeyframes(4).to.id).toBe(last.id);
  });

  it("brackets a midpoint with the surrounding pair", () => {
    const first = SECTIONS[0];
    const second = SECTIONS[1];
    const midpoint = (first.at + second.at) / 2;

    const { from, to, blend } = resolveKeyframes(midpoint);
    expect(from.id).toBe(first.id);
    expect(to.id).toBe(second.id);
    expect(blend).toBeCloseTo(0.5, 5);
  });

  it("returns a blend inside 0..1 across the whole scroll range", () => {
    for (let progress = 0; progress <= 1; progress += 0.01) {
      const { blend } = resolveKeyframes(progress);
      expect(blend).toBeGreaterThanOrEqual(0);
      expect(blend).toBeLessThanOrEqual(1);
    }
  });

  it("never returns undefined keyframes, so the camera cannot read a null pose", () => {
    for (let progress = -0.5; progress <= 1.5; progress += 0.017) {
      const { from, to } = resolveKeyframes(progress);
      expect(from).toBeDefined();
      expect(to).toBeDefined();
    }
  });
});

describe("sectionAt", () => {
  it("reports the first section before any scrolling", () => {
    expect(sectionAt(0)).toBe(SECTIONS[0].id);
  });

  it("reports the last section at full scroll", () => {
    expect(sectionAt(1)).toBe(SECTIONS[SECTIONS.length - 1]!.id);
  });

  it("changes monotonically through the storyboard", () => {
    const seen: string[] = [];
    for (let progress = 0; progress <= 1; progress += 0.005) {
      const id = sectionAt(progress);
      if (seen[seen.length - 1] !== id) seen.push(id);
    }
    expect(seen).toEqual(SECTIONS.map((section) => section.id));
  });
});
