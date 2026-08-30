# Portfolio v2

A single continuous 3D scene, rendered in real time with WebGPU, that the whole site
scrolls through. There are no pages to navigate between — scroll position drives a
camera along a storyboard, and the DOM is a thin accessible overlay on top.

This branch is the foundation: the rendering pipeline, performance system, tooling and
test harness are complete and verified. The content, camera choreography and final art
direction are placeholders, deliberately isolated so they can be replaced without
touching anything else.

## Quick start

```bash
nvm use              # Node 22.22.2, pinned in .nvmrc
npm ci
npm run dev          # http://localhost:3000
```

| Command                   | Purpose                                                          |
| ------------------------- | ---------------------------------------------------------------- |
| `npm run dev`             | Dev server (Turbopack)                                           |
| `npm run build`           | Production build                                                 |
| `npm run validate`        | Format check, lint, typecheck and unit tests — the pre-push gate |
| `npm test`                | Vitest unit tests                                                |
| `npm run e2e`             | Playwright end-to-end and performance tests                      |
| `npm run analyze`         | Production build with the bundle analyzer                        |
| `npm run assets:optimize` | Compress `public/models/source/*.glb` for the web                |

## Stack

Everything here is OSI-licensed open source.

| Layer         | Choice                             | Why this one                                                                                                                         |
| ------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Framework     | Next.js 16 (App Router, Turbopack) | Static export of the shell plus first-class React 19 and the React Compiler.                                                         |
| UI runtime    | React 19.2 + React Compiler        | The compiler auto-memoizes the overlay, so DOM work cannot steal the canvas's frame budget.                                          |
| 3D            | three.js 0.185 `WebGPURenderer`    | WebGPU compute and lower CPU overhead per draw, with an automatic WebGL2 fallback.                                                   |
| 3D bindings   | React Three Fiber 9 + drei 10      | Declarative scene graph with no per-frame React renders.                                                                             |
| Shaders       | TSL (Three Shading Language)       | One node graph compiles to both WGSL and GLSL, so effects work on either backend without a second implementation.                    |
| Animation     | Motion 13                          | MIT-licensed, hardware-accelerated, and it can animate outside React's render cycle. Chosen over GSAP, which is not OSI open source. |
| Smooth scroll | Lenis 1.3                          | Scroll position is the single input to the camera, so easing the scroll eases the camera for free.                                   |
| State         | Zustand 5                          | Store reads outside React (`getState`) are what make per-frame access free.                                                          |
| Styling       | Tailwind CSS 4.3                   | CSS-first `@theme` tokens: one definition becomes both a custom property and a utility.                                              |
| Components    | Radix UI + lucide-react + CVA      | Accessible headless primitives with no imposed styling; variants stay type-safe.                                                     |
| Language      | TypeScript 7 (native) — see below  | ~10x faster typechecking than `tsc` on this project.                                                                                 |
| Lint / format | ESLint 10 (flat) + Prettier 3.9    | Type-aware rules across the whole repo, including config files.                                                                      |
| Tests         | Vitest 4 + Playwright 1.62         | Unit tests for logic, and browser tests that measure real frame timings.                                                             |

## Architecture

```
src/
  app/          Next.js routes, global CSS and design tokens
  components/
    canvas/     Renderer lifecycle: canvas, frame clock, post-processing, adaptive quality
    scene/      Scene contents: camera rig, lighting, particles, geometry
    ui/         DOM overlay: nav, copy, progress, perf HUD, display settings
    providers/  Smooth scroll, pointer tracking, Motion config
  config/       Storyboard, quality tiers, site metadata — the tuning surface
  lib/          Capability detection, renderer factory, math, perf counters
  stores/       Zustand stores plus the non-reactive per-frame buffer
```

### The frame budget rule

At 60fps there are 16.6ms per frame, and a single React re-render of the overlay can
eat a meaningful slice of it. So the codebase splits state by update frequency:

- **Per-frame values** (scroll, pointer, elapsed time) live in `stores/frame-state.ts`,
  a plain mutable object. Nothing subscribes to it and nothing re-renders when it
  changes; `useFrame` callbacks read it directly.
- **Discrete values** (active section, quality tier, status) live in Zustand and are
  written only when they actually change.

The camera rig writes to the camera every frame and never re-renders. `CameraRig`
renders exactly once.

### Adaptive quality

A fixed quality preset is a guess about the visitor's hardware. Instead, tiers are
defined in `config/quality.ts`, one is chosen from device capabilities at boot, and
`<AdaptiveQuality />` steps it up or down from measured frame timings. Hysteresis
(a wide gap between the upgrade and downgrade thresholds) plus a settle window stop
it oscillating or over-reacting to a single stall during asset decode.

Three ways to override it, all of which lock the controller out:

- The **display settings** panel in the header — the visitor-facing control.
- `?quality=low|medium|high|ultra` — for reviewing every tier on one machine.
- `Shift + P` opens the performance HUD (fps, frame time, draw calls, triangles,
  backend, active tier).

### Rendering

`WebGPURenderer` is created through `lib/renderer.ts`, which probes for an adapter and
falls back to WebGL2. Because the renderer cannot be swapped without discarding every
compiled shader, capability detection completes _before_ the canvas mounts.

Post-processing is a TSL node graph in `components/canvas/render-pipeline.tsx`: bloom,
ambient occlusion, chromatic aberration, film grain and FXAA/SMAA, each gated by the
active tier. The particle field derives all its per-instance randomness from
`instanceIndex` inside the shader rather than from instanced attributes — six attribute
buffers would exceed WebGPU's vertex buffer limit once geometry attributes are counted.

### Accessibility

The 3D layer is presentation. Every section's copy is real DOM in the accessibility
tree, headings are ordered, and navigation is keyboard-operable. `prefers-reduced-motion`
is honoured at three levels: CSS, Motion's `MotionConfig`, and the camera rig (which
collapses its damping so the camera cuts instead of gliding).

## TypeScript

`package.json` installs TypeScript twice, on purpose:

```jsonc
"@typescript/native": "npm:typescript@^7.0.2",     // the Go-native compiler → `tsc`
"typescript":        "npm:@typescript/typescript6@6.0.2", // the JS API, for tooling
```

TypeScript 7 is a native compiler and does not expose the programmatic API that
`typescript-eslint`, Next.js and editors depend on. Installing both gives the speed of
the native compiler for `npm run typecheck` and a working API for everything else.
`next.config.ts` sets `experimental.useTypeScriptCli: false` so Next.js takes the API
path rather than looking for a `tsc` binary in the aliased package.

`npm run typecheck` uses TS7. `npm run typecheck:api` runs the same check through TS6
if you need to confirm the two agree.

## Testing

`npm test` — 49 unit tests over the storyboard resolver, quality tiers, capability
detection, the stores and the display settings panel.

`npm run e2e` — 16 Playwright tests against a production build. Beyond the usual
behavioural checks it asserts performance properties: that a GPU backend is negotiated,
that the render loop parks on a hidden tab, and that a pinned tier survives.

Two groups are worth calling out.

**Per-tier rendering.** Each tier compiles a different TSL graph, and a node that fails
to build takes the whole graph down and leaves a black canvas — while the page still
loads, the HUD still reports the tier, and every other test still passes. So every tier
is checked individually for submitted geometry and a clean console, and the tiers are
checked to be strictly increasing in triangle count.

**Main-thread cost.** CI has no GPU, so frames go through SwiftShader and absolute frame
rates are meaningless. The suite therefore also measures at a 320×200 viewport, which
takes rasterisation off the critical path and leaves only main-thread cost. If a change
introduces a per-frame allocation or a React render per frame, that test collapses while
the full-viewport one would still pass.

## Adding content

- **Camera and script** — edit `config/sections.ts`. Add or reorder keyframes and both
  the camera path and the DOM overlay follow. Nothing else hardcodes a camera position.
- **Scene objects** — add components under `components/scene/` and mount them in
  `experience.tsx`. Read the quality tier via `useQualitySettings()`.
- **Models** — drop sources in `public/models/source/`, run `npm run assets:optimize`,
  and load from `public/models/optimized/`.
- **Performance tuning** — `config/quality.ts` is the only file that needs touching.

## Conventions

Commits follow [Conventional Commits](https://www.conventionalcommits.org/), enforced by
commitlint. Husky runs `lint-staged` (ESLint then Prettier) on every commit.
