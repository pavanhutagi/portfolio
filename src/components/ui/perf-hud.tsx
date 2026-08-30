"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { type PerfStats, perfStats } from "@/lib/perf-stats";
import { useUIStore } from "@/stores/ui-store";

/** Display refresh rate. Four updates a second is readable without being noisy. */
const POLL_MS = 250;

function tone(fps: number): string {
  if (fps >= 55) return "text-accent";
  if (fps >= 40) return "text-ember";
  return "text-red-400";
}

/**
 * Developer performance overlay, toggled with `Shift + P`.
 *
 * Polls the shared counters on a timer instead of subscribing to the render loop,
 * which keeps the monitor's own cost to four React renders a second regardless of
 * how fast the scene is running.
 */
export function PerfHud() {
  const debugOpen = useUIStore((state) => state.debugOpen);
  const toggleDebug = useUIStore((state) => state.toggleDebug);
  const [stats, setStats] = useState<PerfStats>(perfStats);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key.toLowerCase() === "p") {
        event.preventDefault();
        toggleDebug();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [toggleDebug]);

  useEffect(() => {
    if (!debugOpen) return;
    const id = setInterval(() => {
      setStats({ ...perfStats });
    }, POLL_MS);
    return () => {
      clearInterval(id);
    };
  }, [debugOpen]);

  if (!debugOpen) return null;

  const rows: [string, string][] = [
    ["fps", String(stats.fps)],
    ["frame", `${stats.frameMs.toFixed(2)} ms`],
    ["worst", `${stats.worstFrameMs.toFixed(2)} ms`],
    ["draws", String(stats.drawCalls)],
    ["tris", stats.triangles.toLocaleString("en-US")],
    ["geo", String(stats.geometries)],
    ["tex", String(stats.textures)],
    ["backend", stats.backend],
    ["tier", stats.qualityTier],
  ];

  return (
    <aside
      aria-label="Performance statistics"
      data-testid="perf-hud"
      className="pointer-events-none fixed top-4 left-4 z-50 w-44 rounded-lg border border-hairline bg-void/80 p-3 font-mono text-[11px] leading-relaxed backdrop-blur-md"
    >
      <p className="mb-2 text-[10px] tracking-[0.18em] text-faint uppercase">Performance</p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
        {rows.map(([label, value]) => (
          <div key={label} className="col-span-2 grid grid-cols-subgrid">
            <dt className="text-faint">{label}</dt>
            <dd
              className={cn(
                "text-right tabular-nums",
                label === "fps" ? tone(stats.fps) : "text-muted"
              )}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
