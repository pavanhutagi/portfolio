"use client";

import dynamic from "next/dynamic";

/**
 * Client boundary that keeps the renderer out of the server bundle and off the
 * critical path.
 *
 * three.js, the WebGPU build and the node-material system make up the bulk of this
 * app's JavaScript and cannot run during SSR. Splitting them behind `ssr: false`
 * here lets the DOM shell — navigation, copy, the loading veil — stream and paint
 * first, with the renderer arriving in parallel.
 *
 * `ssr: false` is only legal inside a Client Component, which is the entire reason
 * this thin wrapper exists rather than doing the dynamic import in `page.tsx`.
 */
const SceneCanvas = dynamic(
  () => import("./scene-canvas").then((mod) => ({ default: mod.SceneCanvas })),
  { ssr: false }
);

const Experience = dynamic(
  () => import("@/components/scene/experience").then((mod) => ({ default: mod.Experience })),
  { ssr: false }
);

export function SceneRoot() {
  return (
    <SceneCanvas>
      <Experience />
    </SceneCanvas>
  );
}
