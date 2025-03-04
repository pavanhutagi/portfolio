"use client";

import React, { useState } from "react";

import { DetailPopup } from "@/components/about/DetailPopup";
import { SubsectionCard } from "@/components/about/SubsectionCard";
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
    <section id="about" className="flex h-screen items-center justify-center">
      <div className="overflow-hidden flex h-[80vh] lg:h-[700px] w-[90%] max-w-[1200px] rounded-[50px]">
        <div className="w-full h-full relative">
          <div className="w-full h-full">
            <div
              className={`w-full h-full flex flex-col md:flex-row overflow-scroll ${
                activePopup ? "md:block" : ""
              }`}
            >
              <div className={`${activePopup ? "w-full" : "w-full md:w-1/2"} h-full`}>
                <div className="bg-background-dark dark:bg-background-light h-full w-full flex justify-center flex-col p-6 relative">
                  <div className="overflow-scroll flex flex-col gap-6">
                    <h2 className="text-3xl font-bold text-text-dark dark:text-text-light">
                      Hey, I'm Pavan 👋
                    </h2>

                    <h4 className="text-l text-text-dark dark:text-text-light">
                      A developer, designer, DJ, and breakdancer from Bengaluru, with roots in
                      Belagavi. I thrive at the intersection of technology, creativity, and
                      movement.
                    </h4>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

                    <span className="text-text-dark dark:text-text-light">
                      For me, life is about building, moving, and creating one project, one beat,
                      and one adventure at a time.
                    </span>
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

              {!activePopup && (
                <div className="w-full md:w-1/2 h-full flex items-center justify-center">
                  <div className="bg-[#a65959] h-full w-full">
                    <img
                      src="/images/me.jpeg"
                      alt="About me"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
