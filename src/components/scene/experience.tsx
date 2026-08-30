"use client";

import { Color } from "three";

import { CameraRig } from "./camera-rig";
import { Centerpiece } from "./centerpiece";
import { Ground } from "./ground";
import { Lighting } from "./lighting";
import { ParticleField } from "./particle-field";

const BACKGROUND = new Color("#05070c");

/**
 * Root of the 3D world.
 *
 * This is the composition seam: everything scene-related is assembled here, and
 * `SceneCanvas` stays purely responsible for the renderer and its lifecycle. New
 * content gets added here, and new camera beats go in `config/sections`.
 */
export function Experience() {
  return (
    <>
      {/* Exponential fog does the heavy lifting for depth: distant particles dissolve
          into the background instead of ending at a visible boundary. */}
      <fogExp2 args={[BACKGROUND.getHex(), 0.024]} attach="fog" />
      <color attach="background" args={[BACKGROUND.getHex()]} />

      <CameraRig />
      <Lighting />

      <Centerpiece />
      <Ground />
      <ParticleField />
    </>
  );
}
