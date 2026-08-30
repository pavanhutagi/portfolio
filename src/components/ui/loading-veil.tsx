"use client";

import { AnimatePresence, motion } from "motion/react";

import { useSceneStore } from "@/stores/scene-store";

/**
 * Covers the canvas until the first real frame exists.
 *
 * Renderer initialisation is genuinely asynchronous — requesting a GPU adapter and
 * compiling the pipeline both take time — so without this the visitor would see a
 * flash of empty background first. The veil lifts on `ready`, which
 * `SceneReadySignal` only sets after a frame has actually been drawn.
 */
export function LoadingVeil() {
  const status = useSceneStore((state) => state.status);
  const visible = status === "booting" || status === "loading";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="veil"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-void"
        >
          <div className="flex flex-col items-center gap-5">
            <div className="relative size-12">
              <span className="absolute inset-0 rounded-full border border-accent/30" />
              <span className="absolute inset-0 animate-pulse-ring rounded-full border border-accent" />
            </div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-faint uppercase">
              Initialising renderer
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
