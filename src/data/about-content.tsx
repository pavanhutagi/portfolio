import React from "react";

import Backpacker from "@/components/about/sections/backpacker";
import Breakdancer from "@/components/about/sections/breakdancer";
import Designer from "@/components/about/sections/designer";
import DJ from "@/components/about/sections/dj";
import WebDeveloper from "@/components/about/sections/web-developer";
import type { SubsectionsDataMap } from "@/types/about";

export const subsectionData: SubsectionsDataMap = {
  webDeveloper: {
    icon: "💻",
    title: "Web Developer",
    shortDescription:
      "I specialize in developing scalable, high-performance web applications with a focus on UX.",
    detailContent: <WebDeveloper />,
  },
  designer: {
    icon: "🎨",
    title: "Designer",
    shortDescription: "I shape compelling visuals through UI/UX, graphic design, and branding.",
    detailContent: <Designer />,
  },
  dj: {
    icon: "🎧",
    title: "DJ",
    shortDescription: "I mix beats, create soundscapes, and love making people move.",
    detailContent: <DJ />,
  },
  breakdancer: {
    icon: "🕺",
    title: "Breakdancer",
    shortDescription: "For me, rhythm is everywhere - in code, music, and movement.",
    detailContent: <Breakdancer />,
  },
  backpacker: {
    icon: "🎒",
    title: "Backpacker",
    shortDescription:
      "Exploring remote places, new cultures, and chasing experiences fuels my creativity.",
    detailContent: <Backpacker />,
  },
};
