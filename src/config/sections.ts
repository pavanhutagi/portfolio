/**
 * Scroll storyboard.
 *
 * The site is one continuous 3D shot rather than a stack of pages. Scrolling maps
 * to a normalised progress value in `[0, 1]`, and the camera rig interpolates
 * between the keyframes below.
 *
 * This is the file to edit when the script and camera choreography are decided:
 * add or reorder sections here and both the camera path and the DOM overlay
 * follow automatically. Nothing else hardcodes a camera position.
 */
export type Vec3 = readonly [x: number, y: number, z: number];

export interface SectionKeyframe {
  id: string;
  /** Shown in navigation and used as the overlay heading. */
  label: string;
  /** Where this section starts along overall scroll progress, in `[0, 1]`. */
  at: number;
  /** Camera world position at `at`. */
  position: Vec3;
  /** Point the camera looks at. */
  target: Vec3;
  /** Vertical field of view in degrees. Narrowing it compresses depth for dramatic beats. */
  fov: number;
  /** Copy for the DOM overlay. Placeholder until the script is written. */
  headline: string;
  body: string;
}

export const SECTIONS = [
  {
    id: "intro",
    label: "Intro",
    at: 0,
    position: [0, 0.6, 9],
    target: [0, 0.35, 0],
    fov: 42,
    headline: "Pavan Hutagi",
    body: "Frontend Engineer & Architect. Building high-performance interfaces for the web.",
  },
  {
    id: "craft",
    label: "Craft",
    at: 0.28,
    position: [4.6, 1.5, 4.6],
    target: [0, 0.5, 0],
    fov: 38,
    headline: "Craft",
    body: "Seven years turning intricate design systems into interfaces that hold 60 frames per second.",
  },
  {
    id: "work",
    label: "Work",
    at: 0.56,
    position: [-4.2, 2.6, 4.0],
    target: [0, 0.2, 0],
    fov: 46,
    headline: "Selected Work",
    body: "Architecture, design systems and real-time graphics for products used at scale.",
  },
  {
    id: "contact",
    label: "Contact",
    at: 0.85,
    position: [0, 1.1, 3.1],
    target: [0, 0.6, 0],
    fov: 34,
    headline: "Let's build something",
    body: "Open to collaboration, consulting and conversations about the rendering pipeline.",
  },
] as const satisfies readonly SectionKeyframe[];

export type SectionId = (typeof SECTIONS)[number]["id"];

/** Total scrollable height, expressed as a multiple of the viewport height. */
export const SCROLL_LENGTH_VH = 700;

/** Widened view of the storyboard, for iteration that does not need literal types. */
const TIMELINE: readonly SectionKeyframe[] = SECTIONS;

const FIRST_KEYFRAME: SectionKeyframe = SECTIONS[0];
// The `?? ` branch is unreachable — SECTIONS is a non-empty literal tuple — but a
// computed index is still widened to `T | undefined` under noUncheckedIndexedAccess.
const LAST_KEYFRAME: SectionKeyframe = SECTIONS[SECTIONS.length - 1] ?? SECTIONS[0];

export interface ResolvedKeyframes {
  from: SectionKeyframe;
  to: SectionKeyframe;
  /** Position between `from` and `to`, in `[0, 1]`. */
  blend: number;
}

/**
 * Resolves scroll progress to the surrounding keyframe pair plus a local blend
 * factor, so the camera rig can interpolate without re-scanning the storyboard.
 */
export function resolveKeyframes(progress: number): ResolvedKeyframes {
  if (progress <= FIRST_KEYFRAME.at) {
    return { from: FIRST_KEYFRAME, to: FIRST_KEYFRAME, blend: 0 };
  }

  if (progress >= LAST_KEYFRAME.at) {
    return { from: LAST_KEYFRAME, to: LAST_KEYFRAME, blend: 0 };
  }

  for (let index = 0; index < TIMELINE.length - 1; index += 1) {
    const from = TIMELINE[index];
    const to = TIMELINE[index + 1];
    if (!from || !to) break;

    if (progress >= from.at && progress < to.at) {
      const span = to.at - from.at;
      return { from, to, blend: span <= 0 ? 0 : (progress - from.at) / span };
    }
  }

  return { from: LAST_KEYFRAME, to: LAST_KEYFRAME, blend: 0 };
}

/** Returns the section that owns the given scroll progress. */
export function sectionAt(progress: number): SectionId {
  let active: SectionId = SECTIONS[0].id;
  for (const section of SECTIONS) {
    if (progress >= section.at) active = section.id;
  }
  return active;
}
