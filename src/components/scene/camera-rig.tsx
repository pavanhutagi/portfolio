"use client";

import { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Vector3 } from "three";

import { resolveKeyframes, sectionAt } from "@/config/sections";
import { damp, smoothstep } from "@/lib/math";
import { frameState } from "@/stores/frame-state";
import { useSceneStore } from "@/stores/scene-store";
import { useUIStore } from "@/stores/ui-store";

/** Convergence rates. Position trails the target slightly for a sense of weight. */
const POSITION_LAMBDA = 3.4;
const TARGET_LAMBDA = 4.2;
const FOV_LAMBDA = 3;

/** Maximum pointer-driven camera offset, in world units. */
const PARALLAX_STRENGTH = 0.38;

/**
 * Drives the camera along the storyboard defined in `config/sections`.
 *
 * Scroll progress selects a keyframe pair and a blend factor; the resulting pose
 * is then exponentially damped rather than applied directly. That damping is what
 * makes fast scrolling feel like a camera with mass instead of a value snapping
 * between positions, and it also absorbs the small irregularities in wheel and
 * trackpad deltas.
 *
 * All input arrives through the non-reactive frame buffer, so the camera updates
 * every frame without ever re-rendering React.
 */
export function CameraRig() {
  // Reused across frames; allocating vectors inside the loop would hand the GC
  // ~200 objects per second and produce periodic frame spikes. Held in a ref rather
  // than a memo because the contents are mutated outside of render, which is what
  // refs exist for — `currentTarget` in particular carries damping state forward,
  // so it must be per-instance rather than module scope.
  const scratch = useRef({
    desiredPosition: new Vector3(),
    desiredTarget: new Vector3(),
    currentTarget: new Vector3(0, 0.35, 0),
  });

  const activeSection = useRef(sectionAt(0));

  // The camera is read from the frame state rather than through `useThree`, which
  // would subscribe this component to the store and re-render it whenever the
  // default camera is swapped. Reading it per frame is both cheaper and always current.
  useFrame((state, delta) => {
    if (frameState.hidden) return;

    const camera = state.camera;
    if (!(camera instanceof PerspectiveCamera)) return;

    const { desiredPosition, desiredTarget, currentTarget } = scratch.current;

    const dt = Math.min(delta, 1 / 30);
    const { scrollProgress } = frameState;
    const { from, to, blend } = resolveKeyframes(scrollProgress);

    // Ease the blend so arriving at a keyframe decelerates instead of stopping dead.
    const eased = smoothstep(0, 1, blend);

    desiredPosition.set(
      from.position[0] + (to.position[0] - from.position[0]) * eased,
      from.position[1] + (to.position[1] - from.position[1]) * eased,
      from.position[2] + (to.position[2] - from.position[2]) * eased
    );

    desiredTarget.set(
      from.target[0] + (to.target[0] - from.target[0]) * eased,
      from.target[1] + (to.target[1] - from.target[1]) * eased,
      from.target[2] + (to.target[2] - from.target[2]) * eased
    );

    const reducedMotion = useSceneStore.getState().reducedMotion;

    if (!reducedMotion) {
      // Parallax is folded into the desired pose before damping, so the pointer
      // response inherits the same smoothing as the scroll motion.
      desiredPosition.x += frameState.smoothPointerX * PARALLAX_STRENGTH;
      desiredPosition.y += frameState.smoothPointerY * PARALLAX_STRENGTH * 0.6;
    }

    const positionLambda = reducedMotion ? 1000 : POSITION_LAMBDA;
    const targetLambda = reducedMotion ? 1000 : TARGET_LAMBDA;

    camera.position.set(
      damp(camera.position.x, desiredPosition.x, positionLambda, dt),
      damp(camera.position.y, desiredPosition.y, positionLambda, dt),
      damp(camera.position.z, desiredPosition.z, positionLambda, dt)
    );

    currentTarget.set(
      damp(currentTarget.x, desiredTarget.x, targetLambda, dt),
      damp(currentTarget.y, desiredTarget.y, targetLambda, dt),
      damp(currentTarget.z, desiredTarget.z, targetLambda, dt)
    );

    camera.lookAt(currentTarget);

    const desiredFov = from.fov + (to.fov - from.fov) * eased;
    const nextFov = damp(camera.fov, desiredFov, reducedMotion ? 1000 : FOV_LAMBDA, dt);
    if (Math.abs(nextFov - camera.fov) > 0.001) {
      camera.fov = nextFov;
      camera.updateProjectionMatrix();
    }

    // The active section is genuine React state (it drives the DOM overlay), so it
    // is only pushed to the store on an actual change rather than every frame.
    const next = sectionAt(scrollProgress);
    if (next !== activeSection.current) {
      activeSection.current = next;
      useUIStore.getState().setActiveSection(next);
    }
  });

  return null;
}
