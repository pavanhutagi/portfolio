"use client";

import { AnimatePresence, motion } from "motion/react";

import { SECTIONS } from "@/config/sections";
import { useUIStore } from "@/stores/ui-store";

const container = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const line = {
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -16, filter: "blur(6px)" },
};

/**
 * Copy layer over the 3D scene.
 *
 * Only ever animates `opacity`, `transform` and `filter` — all compositor-only
 * properties. Animating anything that triggers layout here would stall the main
 * thread mid-transition and cost the canvas frames at exactly the moment the
 * camera is moving fastest.
 */
export function SectionOverlay() {
  const activeSection = useUIStore((state) => state.activeSection);
  const section = SECTIONS.find((entry) => entry.id === activeSection) ?? SECTIONS[0];

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex items-end px-6 pb-20 sm:px-10 sm:pb-24">
      <AnimatePresence mode="wait">
        <motion.div
          key={section.id}
          variants={container}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl gpu-layer"
        >
          <motion.p
            variants={line}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 font-mono text-[11px] tracking-[0.3em] text-accent uppercase"
          >
            {section.label}
          </motion.p>

          <motion.h1
            variants={line}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl leading-[1.05] font-light text-balance-pretty text-ink sm:text-6xl"
          >
            {section.headline}
          </motion.h1>

          <motion.p
            variants={line}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 max-w-md text-sm leading-relaxed text-balance-pretty text-muted sm:text-base"
          >
            {section.body}
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
