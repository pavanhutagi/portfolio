"use client";

import { useCallback } from "react";

import { motion } from "motion/react";

import { SECTIONS, type SectionId } from "@/config/sections";
import { SITE } from "@/config/site";
import { cn } from "@/lib/cn";
import { getSmoothScroll } from "@/lib/smooth-scroll";
import { useUIStore } from "@/stores/ui-store";

import { DisplaySettings } from "./display-settings";

/**
 * Fixed navigation.
 *
 * Clicks are routed through Lenis rather than native anchor jumps so the camera
 * eases to the beat instead of teleporting. Because scroll position is the single
 * input to the camera rig, animating the scroll is all that is needed — the 3D
 * transition comes for free.
 */
export function SiteNav() {
  const activeSection = useUIStore((state) => state.activeSection);

  const scrollToSection = useCallback((id: SectionId) => {
    const lenis = getSmoothScroll();
    const section = SECTIONS.find((entry) => entry.id === id);
    if (!lenis || !section) return;
    lenis.scrollTo(section.at * lenis.limit, { duration: 1.6 });
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-6 px-6 py-5 sm:px-10">
      <a
        href="#intro"
        className="pointer-events-auto font-display text-sm tracking-[0.22em] text-ink uppercase transition-colors hover:text-accent"
        onClick={(event) => {
          event.preventDefault();
          scrollToSection("intro");
        }}
      >
        {SITE.name}
      </a>

      <div className="flex items-center gap-2">
        <nav aria-label="Sections" className="pointer-events-auto">
          <ul className="flex items-center gap-1 rounded-full border border-hairline bg-void/50 p-1 backdrop-blur-md">
            {SECTIONS.map((section) => {
              const isActive = section.id === activeSection;
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => {
                      scrollToSection(section.id);
                    }}
                    className={cn(
                      "relative rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors",
                      isActive ? "text-void" : "text-muted hover:text-ink"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        // A shared `layoutId` lets Motion animate the pill between
                        // buttons instead of cross-fading two separate elements.
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10">{section.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <DisplaySettings />
      </div>
    </header>
  );
}
