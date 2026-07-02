"use client";

import clsx from "clsx";

export default function CyberBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
      {/* Perspective neon grid */}
      <div className={clsx("absolute inset-0", "cyber-grid cyber-grid-fade animate-grid-drift")} />

      {/* Corner glow blooms */}
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary-500/10 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-accent-500/10 blur-[120px]" />

      {/* Sweeping scan line */}
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-primary-500/10 to-transparent animate-scan-sweep" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.45) 100%)",
        }}
      />
    </div>
  );
}
