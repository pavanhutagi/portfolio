"use client";

import React, { useState } from "react";

import clsx from "clsx";

import { DetailPopup } from "@/components/about/detail-popup";
import { SubsectionCard } from "@/components/about/subsection-card";
import { subsectionData } from "@/data/about-content";
import type { SubsectionId } from "@/types/about";

export default function AboutSection() {
  const [activePopup, setActivePopup] = useState<SubsectionId | null>(null);

  const openPopup = (popupId: SubsectionId) => {
    setActivePopup(popupId);
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  return (
    <section id="about" className="flex min-h-screen items-center justify-center py-24 px-6">
      <div className="w-full max-w-[1200px]">
        {/* Section label */}
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-primary-400">
            [ 01 ] // Profile
          </span>
          <span className="h-px flex-1 bg-linear-to-r from-primary-500/60 to-transparent" />
        </div>

        <div
          className={clsx(
            "relative overflow-hidden clip-corner",
            "border border-secondary-400/40 bg-secondary-900/70 backdrop-blur-md",
            "glow-cyan/50",
            "h-[80vh] lg:h-[680px]"
          )}
        >
          <div className={clsx("flex h-full w-full flex-col md:flex-row overflow-auto")}>
            {/* Left: bio + subsections */}
            <div className={clsx("h-full", activePopup ? "w-full" : "w-full md:w-3/5")}>
              <div className="relative flex h-full w-full flex-col justify-center p-6 sm:p-8">
                <div className="flex flex-col gap-8 overflow-auto custom-scrollbar pr-1">
                  <div className="flex flex-col gap-3">
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-400">
                      whoami
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primaryDark">
                      Hey, I'm <span className="neon-cyan">Pavan</span>
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed text-text-secondaryDark">
                      Frontend Engineer &amp; Architect with 7+ years of experience building
                      scalable, high-performance web applications. A developer, designer, and DJ
                      from Bengaluru, with roots in Belagavi — I thrive at the intersection of
                      technology, creativity, and movement.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {Object.entries(subsectionData).map(([id, data]) => (
                      <SubsectionCard
                        key={id}
                        icon={data.icon}
                        title={data.title}
                        description={data.shortDescription}
                        onCardClick={() => openPopup(id as SubsectionId)}
                      />
                    ))}
                  </div>

                  <p className="border-l-2 border-accent-500/60 pl-4 text-sm italic text-text-secondaryDark">
                    For me, life is about building, moving, and creating — one project, one beat,
                    and one adventure at a time.
                  </p>
                </div>

                {activePopup && (
                  <DetailPopup
                    icon={subsectionData[activePopup].icon}
                    title={subsectionData[activePopup].title}
                    onClose={closePopup}
                  >
                    {subsectionData[activePopup].detailContent}
                  </DetailPopup>
                )}
              </div>
            </div>

            {/* Right: portrait with neon frame */}
            {!activePopup && (
              <div className="relative hidden h-full w-2/5 md:block">
                <div className="absolute inset-0 z-10 bg-linear-to-l from-transparent to-secondary-900/70" />
                <div
                  className="absolute inset-0 z-10 mix-blend-color opacity-40"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,229,255,0.6), rgba(255,45,149,0.6))",
                  }}
                />
                <img
                  src="/images/me.jpeg"
                  alt="Portrait of Pavan"
                  className="h-full w-full object-cover object-center grayscale-[0.2] contrast-110"
                />
                <div className="pointer-events-none absolute inset-0 z-20 scanlines" />
                {/* HUD corner brackets */}
                <span className="absolute left-3 top-3 z-30 h-6 w-6 border-l-2 border-t-2 border-primary-500" />
                <span className="absolute right-3 top-3 z-30 h-6 w-6 border-r-2 border-t-2 border-accent-500" />
                <span className="absolute bottom-3 left-3 z-30 h-6 w-6 border-b-2 border-l-2 border-accent-500" />
                <span className="absolute bottom-3 right-3 z-30 h-6 w-6 border-b-2 border-r-2 border-primary-500" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
