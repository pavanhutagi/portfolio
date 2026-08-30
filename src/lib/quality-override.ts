import { QUALITY_TIERS, type QualityTier } from "@/config/quality";

/**
 * Reads a quality tier pinned via `?quality=low|medium|high|ultra`.
 *
 * Without this, the only way to see how the scene looks and performs on a weaker
 * device is to own one. Pinning a tier from the URL makes every visual tier
 * reviewable on one machine, and because it locks the tier it also isolates the
 * adaptive controller when tuning the presets themselves.
 */
export function readQualityOverride(search: string): QualityTier | null {
  const requested = new URLSearchParams(search).get("quality");
  if (!requested) return null;

  const normalised = requested.toLowerCase();
  return QUALITY_TIERS.find((tier) => tier === normalised) ?? null;
}
