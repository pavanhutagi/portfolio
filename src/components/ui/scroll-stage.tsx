"use client";

import { SCROLL_LENGTH_VH, SECTIONS } from "@/config/sections";

/**
 * Gives the document its scrollable height.
 *
 * The site is a single continuous camera move, so there is no per-section markup to
 * scroll through — but something still has to be tall enough to scroll. This
 * renders one empty, full-height landmark per storyboard beat, which keeps real
 * anchor targets and heading structure available to screen readers and deep links
 * while the visible content is drawn by the canvas.
 */
export function ScrollStage() {
  return (
    <div
      aria-hidden={false}
      className="relative w-full"
      style={{ height: `${SCROLL_LENGTH_VH}vh` }}
    >
      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-label={section.label}
          className="absolute w-full"
          style={{ top: `${section.at * 100}%`, height: "100vh" }}
        >
          {/* Visually hidden, but present in the accessibility tree and the DOM
              outline so the page is navigable without the 3D layer. */}
          <h2 className="sr-only">{section.headline}</h2>
          <p className="sr-only">{section.body}</p>
        </section>
      ))}
    </div>
  );
}
