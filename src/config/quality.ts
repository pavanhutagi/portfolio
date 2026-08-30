/**
 * Quality tiers.
 *
 * The scene never renders at a fixed cost. A tier is picked once from device
 * capabilities, then adjusted at runtime by `<AdaptiveQuality />` whenever the
 * measured frame rate drifts away from the target. Every tunable that affects
 * GPU cost lives here so there is a single place to reason about performance.
 */
export const QUALITY_TIERS = ["low", "medium", "high", "ultra"] as const;

export type QualityTier = (typeof QUALITY_TIERS)[number];

/**
 * TRAA is deliberately absent: it needs a velocity buffer written through MRT by
 * every material in the scene, which would constrain what content can be added
 * later. SMAA gets most of the way there with no authoring constraints.
 */
export type AntiAliasMode = "none" | "fxaa" | "smaa";

export interface QualitySettings {
  /** Device-pixel-ratio bounds passed to the canvas. Capped because fragment cost scales with the square of DPR. */
  dpr: [min: number, max: number];
  /** Instance count for the ambient particle field. */
  particleCount: number;
  shadows: boolean;
  shadowMapSize: number;
  antiAlias: AntiAliasMode;
  bloom: boolean;
  /** Screen-space ambient occlusion — the single most expensive effect in the chain. */
  ambientOcclusion: boolean;
  chromaticAberration: boolean;
  filmGrain: boolean;
  /** Multiplier applied to environment map resolution. */
  environmentResolution: number;
}

export const QUALITY_PRESETS: Record<QualityTier, QualitySettings> = {
  low: {
    dpr: [0.6, 1],
    particleCount: 1_500,
    shadows: false,
    shadowMapSize: 512,
    antiAlias: "none",
    bloom: false,
    ambientOcclusion: false,
    chromaticAberration: false,
    filmGrain: false,
    environmentResolution: 128,
  },
  medium: {
    dpr: [0.75, 1.25],
    particleCount: 6_000,
    shadows: true,
    shadowMapSize: 1024,
    antiAlias: "fxaa",
    bloom: true,
    ambientOcclusion: false,
    chromaticAberration: false,
    filmGrain: true,
    environmentResolution: 256,
  },
  high: {
    dpr: [1, 1.75],
    particleCount: 18_000,
    shadows: true,
    shadowMapSize: 2048,
    antiAlias: "smaa",
    bloom: true,
    ambientOcclusion: true,
    chromaticAberration: true,
    filmGrain: true,
    environmentResolution: 512,
  },
  ultra: {
    dpr: [1, 2],
    particleCount: 40_000,
    shadows: true,
    shadowMapSize: 2048,
    antiAlias: "smaa",
    bloom: true,
    ambientOcclusion: true,
    chromaticAberration: true,
    filmGrain: true,
    environmentResolution: 1024,
  },
};

/** Frame-rate window the adaptive controller steers towards. */
export const PERFORMANCE_TARGET = {
  /** Drop a tier when the normalised performance factor stays below this. */
  degradeBelow: 0.75,
  /** Climb a tier when it stays above this. */
  upgradeAbove: 0.95,
  /**
   * Sustained signal required before committing to a tier change. Long enough that a
   * single stall during asset decode cannot permanently downgrade the scene, short
   * enough that genuinely weak hardware is rescued quickly.
   */
  settleSeconds: 0.6,
} as const;

export function nextTierDown(tier: QualityTier): QualityTier {
  const index = QUALITY_TIERS.indexOf(tier);
  return QUALITY_TIERS[Math.max(0, index - 1)] ?? tier;
}

export function nextTierUp(tier: QualityTier): QualityTier {
  const index = QUALITY_TIERS.indexOf(tier);
  return QUALITY_TIERS[Math.min(QUALITY_TIERS.length - 1, index + 1)] ?? tier;
}
