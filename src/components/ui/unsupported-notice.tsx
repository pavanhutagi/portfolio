"use client";

import { SECTIONS } from "@/config/sections";
import { SITE } from "@/config/site";
import { useSceneStore } from "@/stores/scene-store";

/**
 * Text-only fallback for hardware that can drive neither WebGPU nor WebGL2.
 *
 * The 3D layer is presentation, not content. When it cannot run, the same
 * storyboard copy is rendered as an ordinary document rather than showing an error,
 * so the portfolio still does its job.
 */
export function UnsupportedNotice() {
  const status = useSceneStore((state) => state.status);
  if (status !== "failed") return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-void px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase">{SITE.role}</p>
        <h1 className="mt-4 font-display text-4xl font-light text-ink">{SITE.name}</h1>
        <p className="mt-4 text-sm text-muted">
          Your browser cannot run the real-time version of this site. Here is the short version.
        </p>

        <div className="mt-12 space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.id}>
              <h2 className="font-display text-xl text-ink">{section.headline}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{section.body}</p>
            </section>
          ))}
        </div>

        <a
          href={SITE.links.email}
          className="mt-12 inline-block font-mono text-xs tracking-[0.2em] text-accent uppercase underline-offset-4 hover:underline"
        >
          Get in touch
        </a>
      </div>
    </div>
  );
}
