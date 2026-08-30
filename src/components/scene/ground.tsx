"use client";

import { useEffect, useMemo } from "react";

import { Color } from "three";
import { abs, float, fract, positionLocal, saturate, smoothstep, vec3 } from "three/tsl";
import { MeshStandardNodeMaterial } from "three/webgpu";

const GRID_SPACING = 0.5;
const LINE_WIDTH = 0.014;
const FADE_START = 6;
const FADE_END = 26;

/**
 * Infinite-feeling grid floor.
 *
 * The grid is generated analytically in the fragment shader instead of sampled
 * from a texture. That means no texture memory, no mip aliasing as the camera
 * pulls back, and crisp lines at any distance — and the radial fade is what hides
 * the plane's actual edges, so the floor reads as unbounded.
 */
export function Ground() {
  const material = useMemo(() => {
    const nodeMaterial = new MeshStandardNodeMaterial({
      color: new Color("#0b0e16"),
      roughness: 0.42,
      metalness: 0.6,
    });

    // Distance from the nearest grid line on each axis, in local plane space.
    const gridUv = positionLocal.xy.div(GRID_SPACING);
    const lineX = abs(fract(gridUv.x).sub(0.5)).sub(0.5).abs();
    const lineY = abs(fract(gridUv.y).sub(0.5)).sub(0.5).abs();

    const line = saturate(
      smoothstep(float(LINE_WIDTH), float(0), lineX).add(
        smoothstep(float(LINE_WIDTH), float(0), lineY)
      )
    );

    const radialFade = smoothstep(float(FADE_END), float(FADE_START), positionLocal.xy.length());

    const accent = new Color("#3aa7bd");
    nodeMaterial.emissiveNode = vec3(accent.r, accent.g, accent.b)
      .mul(line)
      .mul(radialFade)
      .mul(0.55);

    return nodeMaterial;
  }, []);

  useEffect(
    () => () => {
      material.dispose();
    },
    [material]
  );

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.35, 0]}
      receiveShadow
      material={material}
    >
      <planeGeometry args={[60, 60, 1, 1]} />
    </mesh>
  );
}
