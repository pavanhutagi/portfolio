import React from "react";

import type { SubsectionsDataMap } from "@/types/about";

/**
 * Content data for all subsections in the About section
 */
export const subsectionData: SubsectionsDataMap = {
  frontend: {
    icon: "💻",
    title: "Frontend Engineer",
    shortDescription:
      "I craft sleek, interactive web experiences with clean code and modern UI/UX.",
    detailContent: (
      <div className="space-y-4">
        <p>
          As a frontend engineer, I specialize in creating responsive, intuitive, and visually
          appealing web applications. My expertise includes:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Modern JavaScript frameworks (React, Vue, Next.js)</li>
          <li>CSS frameworks and preprocessors (Tailwind, SCSS)</li>
          <li>Performance optimization and accessibility</li>
          <li>State management and API integration</li>
          <li>Animation and interactive experiences</li>
        </ul>
        <p>
          I'm passionate about creating seamless user experiences that blend technical excellence
          with creative design.
        </p>
      </div>
    ),
  },
  design: {
    icon: "🎨",
    title: "Design",
    shortDescription: "I shape compelling visuals through UI/UX, graphic design, and branding.",
    detailContent: (
      <div className="space-y-4">
        <p>
          My design philosophy centers on creating meaningful, purposeful experiences that resonate
          with users. My design skills include:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>UI/UX design and prototyping</li>
          <li>Brand identity and visual systems</li>
          <li>Design thinking and user research</li>
          <li>Illustration and graphic design</li>
          <li>Design tools: Figma, Adobe Creative Suite</li>
        </ul>
        <p>
          I believe good design should be both beautiful and functional, solving real problems while
          delighting users.
        </p>
      </div>
    ),
  },
  dj: {
    icon: "🎧",
    title: "DJ",
    shortDescription: "I mix beats, create soundscapes, and love making people move.",
    detailContent: (
      <div className="space-y-4">
        <p>Music has always been a core part of my creative expression. As a DJ, I:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Mix across genres including house, techno, and hip-hop</li>
          <li>Create seamless journeys through sound</li>
          <li>Read crowds and adapt to create memorable experiences</li>
          <li>Produce original tracks and remixes</li>
          <li>Collaborate with other artists and venues</li>
        </ul>
        <p>
          DJing teaches me about rhythm, timing, and the power of creating emotional
          experiences—skills that translate to all my creative work.
        </p>
      </div>
    ),
  },
  breakdancing: {
    icon: "🕺",
    title: "Breakdancing",
    shortDescription: "For me, rhythm is everywhere—in code, music, and movement.",
    detailContent: (
      <div className="space-y-4">
        <p>
          Breakdancing (breaking) is both my physical practice and creative outlet. Through
          breaking, I:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Express myself through movement and improvisation</li>
          <li>Connect with a global community and culture</li>
          <li>Develop discipline, persistence, and growth mindset</li>
          <li>Learn to overcome challenges through practice</li>
          <li>Find inspiration in the intersection of music and movement</li>
        </ul>
        <p>
          The principles I learn on the dance floor—creativity, adaptability, and
          self-expression—influence my approach to design and development.
        </p>
      </div>
    ),
  },
  backpacking: {
    icon: "🎒",
    title: "Backpacking",
    shortDescription:
      "Exploring remote places, new cultures, and chasing experiences fuels my creativity.",
    detailContent: (
      <div className="space-y-4">
        <p>Travel and exploration are essential to how I see the world. Through backpacking, I:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Immerse myself in diverse cultures and perspectives</li>
          <li>Discover new ways of thinking and problem-solving</li>
          <li>Challenge my comfort zone and build adaptability</li>
          <li>Connect with people from all walks of life</li>
          <li>Find inspiration in natural and human-made wonders</li>
        </ul>
        <p>
          My travels inform my creative work by exposing me to different aesthetics, stories, and
          ways of communicating.
        </p>
      </div>
    ),
  },
};
