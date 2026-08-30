/** Constrains `value` to the inclusive `[min, max]` range. */
export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(Math.max(value, min), max);
}

/** Linearly interpolates from `a` to `b`. */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Frame-rate independent exponential smoothing.
 *
 * A plain `lerp(current, target, 0.1)` inside a render loop moves faster on a
 * 144Hz display than on a 60Hz one. Decaying by `delta` keeps the perceived
 * easing identical regardless of refresh rate, which is what makes scroll and
 * camera motion feel the same on every machine.
 *
 * @param lambda Higher values converge faster.
 */
export function damp(current: number, target: number, lambda: number, delta: number): number {
  return lerp(current, target, 1 - Math.exp(-lambda * delta));
}

/** Maps `value` from `[inMin, inMax]` onto `[outMin, outMax]` without clamping. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const span = inMax - inMin;
  if (span === 0) return outMin;
  return outMin + ((value - inMin) / span) * (outMax - outMin);
}

/** Normalises `value` into `[0, 1]` across `[min, max]`, clamped at both ends. */
export function normalize(value: number, min: number, max: number): number {
  return clamp(mapRange(value, min, max, 0, 1));
}

/** Hermite interpolation between two edges, matching GLSL `smoothstep`. */
export function smoothstep(edge0: number, edge1: number, value: number): number {
  const t = normalize(value, edge0, edge1);
  return t * t * (3 - 2 * t);
}
