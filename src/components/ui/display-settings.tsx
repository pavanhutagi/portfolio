"use client";

import { Check, MonitorCog, Sparkles } from "lucide-react";
import { Popover, RadioGroup } from "radix-ui";

import { QUALITY_PRESETS, QUALITY_TIERS, type QualityTier } from "@/config/quality";
import { cn } from "@/lib/cn";
import { useSceneStore } from "@/stores/scene-store";

/** `auto` hands control back to the adaptive controller. */
const AUTO = "auto";

const TIER_COPY: Record<QualityTier, string> = {
  low: "Geometry only. Safest on integrated graphics.",
  medium: "Bloom and grain, soft shadows.",
  high: "Ambient occlusion, SMAA, dense particles.",
  ultra: "Everything, at full resolution.",
};

/**
 * Lets a visitor override the automatically chosen quality tier.
 *
 * Adaptive quality is right most of the time but it optimises for a stable frame
 * rate, which is not always what someone wants: a visitor on a laptop may prefer
 * the richer look at 40fps, and someone on battery may want the cheapest tier
 * regardless of what the GPU could manage. Choosing a tier here pins it and locks
 * the controller out, exactly as `?quality=` does.
 */
export function DisplaySettings() {
  const qualityTier = useSceneStore((state) => state.qualityTier);
  const qualityLocked = useSceneStore((state) => state.qualityLocked);
  const setQualityTier = useSceneStore((state) => state.setQualityTier);
  const setQualityLocked = useSceneStore((state) => state.setQualityLocked);

  const selected = qualityLocked ? qualityTier : AUTO;

  const onSelect = (value: string) => {
    if (value === AUTO) {
      setQualityLocked(false);
      return;
    }
    setQualityTier(value as QualityTier, { lock: true });
  };

  return (
    <Popover.Root>
      <Popover.Trigger
        aria-label="Display settings"
        className="pointer-events-auto flex size-9 items-center justify-center rounded-full border border-hairline bg-void/50 text-muted backdrop-blur-md transition-colors hover:text-accent data-[state=open]:border-accent data-[state=open]:text-accent"
      >
        <MonitorCog aria-hidden className="size-4" />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={10}
          align="end"
          data-testid="display-settings"
          className="pointer-events-auto z-50 w-72 origin-top rounded-xl border border-hairline bg-void/90 p-3 shadow-2xl shadow-black/50 backdrop-blur-xl data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in"
        >
          <p className="mb-1 px-1 font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
            Render quality
          </p>

          <RadioGroup.Root
            value={selected}
            onValueChange={onSelect}
            aria-label="Render quality"
            className="flex flex-col gap-0.5"
          >
            <QualityOption
              value={AUTO}
              label="Auto"
              // Showing the resolved tier is what makes "Auto" legible: without it the
              // option gives no indication of what the scene is actually doing.
              hint={`Adapts to your frame rate — currently ${qualityTier}.`}
              isSelected={selected === AUTO}
              icon={<Sparkles aria-hidden className="size-3 text-accent" />}
            />

            {QUALITY_TIERS.map((tier) => (
              <QualityOption
                key={tier}
                value={tier}
                label={tier}
                hint={`${TIER_COPY[tier]} ${QUALITY_PRESETS[tier].particleCount.toLocaleString("en-US")} particles.`}
                isSelected={selected === tier}
              />
            ))}
          </RadioGroup.Root>

          <p className="mt-2 border-t border-hairline px-1 pt-2 font-mono text-[10px] leading-relaxed text-faint">
            Shift + P for render stats
          </p>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

interface QualityOptionProps {
  value: string;
  label: string;
  hint: string;
  isSelected: boolean;
  icon?: React.ReactNode;
}

function QualityOption({ value, label, hint, isSelected, icon }: QualityOptionProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-2.5 rounded-lg px-2 py-1.5 transition-colors",
        isSelected ? "bg-accent-soft" : "hover:bg-elevated/60"
      )}
    >
      <RadioGroup.Item
        value={value}
        className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-hairline transition-colors data-[state=checked]:border-accent data-[state=checked]:bg-accent"
      >
        <RadioGroup.Indicator asChild>
          <Check aria-hidden className="size-2.5 text-void" strokeWidth={3.5} />
        </RadioGroup.Indicator>
      </RadioGroup.Item>

      <span className="min-w-0">
        <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] text-ink uppercase">
          {label}
          {icon}
        </span>
        <span className="mt-0.5 block text-[11px] leading-snug text-faint">{hint}</span>
      </span>
    </label>
  );
}
