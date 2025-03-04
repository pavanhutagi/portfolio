import React from "react";

import type { SubsectionsDataMap } from "@/types/about";

/**
 * Content data for all subsections in the About section
 */
export const subsectionData: SubsectionsDataMap = {
  developer: {
    icon: "💻",
    title: "Developer",
    shortDescription:
      "I specialize in developing scalable, high-performance web applications with a focus on UX.",
    detailContent: (
      <div className="flex flex-col gap-6">
        <p>
          I specialize in developing scalable, high-performance web applications with a strong focus
          on user experience, accessibility, and efficiency. With over six years of experience, I
          have worked on enterprise-level tools, UI systems, and interactive web applications that
          streamline workflows and enhance usability.
        </p>

        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-lg">Technical Expertise</h4>
          <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem" }}>
            <li>Frameworks & Languages: Next.js, React, TypeScript, Angular</li>
            <li>Styling & UI Development: Tailwind CSS, SCSS, Material UI, Styled-components</li>
            <li>State Management & API Integration: Redux, Context API, REST, GraphQL</li>
            <li>
              Performance & Accessibility: Optimized rendering, SEO best practices, WCAG compliance
            </li>
            <li>Interactive UI: Drag-and-drop builders, animations, multi-language support</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-lg">Work Experience</h4>

          <div className="flex flex-col gap-2">
            <p className="font-bold flex items-center">
              Frontend Engineer - Consultant (DemTech.ai, 2024 - 2025)
            </p>
            <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem" }}>
              <li>
                Built the UI foundation for BeCause, a citizen mobilization tool for NGOs using
                Next.js, TypeScript, and Material UI.
              </li>
              <li>
                Developed a drag-and-drop campaign builder with Puck, allowing NGOs to create
                interactive campaign pages.
              </li>
              <li>Designed an admin dashboard for centralized campaign management.</li>
              <li>Engineered a server-side Data Grid for handling large datasets efficiently.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold">Software Developer (IBM India Pvt. Ltd, 2018 - 2023)</p>
            <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem" }}>
              <li>
                Led the UI development for DataBlocks, a data transformation tool, using Angular &
                Express.js.
              </li>
              <li>
                Built a drag-and-drop interface with Angular Material CDK for seamless data
                configuration.
              </li>
              <li>
                Developed the Challenges Module, enabling IBM sellers to configure and track
                incentives.
              </li>
              <li>
                Optimized backend queries, reducing load time from 2-3 minutes to 5-10 seconds.
              </li>
              <li>
                Created a universal registration tool, improving authentication across IBM's React
                applications.
              </li>
            </ul>
          </div>
        </div>

        <p>
          I'm passionate about blending technology and design, building scalable UI architectures,
          and crafting seamless, high-performance web experiences.
        </p>
      </div>
    ),
  },
  designer: {
    icon: "🎨",
    title: "Designer",
    shortDescription: "I shape compelling visuals through UI/UX, graphic design, and branding.",
    detailContent: (
      <div className="flex flex-col gap-6">
        <p>I shape compelling visuals through UI/UX, graphic design, and branding.</p>
      </div>
    ),
  },
  dj: {
    icon: "🎧",
    title: "DJ",
    shortDescription: "I mix beats, create soundscapes, and love making people move.",
    detailContent: (
      <div className="flex flex-col gap-6">
        <p>I mix beats, create soundscapes, and love making people move.</p>
      </div>
    ),
  },
  breakdancer: {
    icon: "🕺",
    title: "Breakdancer",
    shortDescription: "For me, rhythm is everywhere - in code, music, and movement.",
    detailContent: (
      <div className="flex flex-col gap-6">
        <p>For me, rhythm is everywhere - in code, music, and movement.</p>
      </div>
    ),
  },
  backpacker: {
    icon: "🎒",
    title: "Backpacker",
    shortDescription:
      "Exploring remote places, new cultures, and chasing experiences fuels my creativity.",
    detailContent: (
      <div className="flex flex-col gap-6">
        <p>Exploring remote places, new cultures, and chasing experiences fuels my creativity.</p>
      </div>
    ),
  },
};
