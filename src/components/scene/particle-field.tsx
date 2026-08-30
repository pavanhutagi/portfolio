"use client";

import { useEffect, useMemo } from "react";

import { AdditiveBlending, Color, PlaneGeometry } from "three";
import {
  cos,
  float,
  hash,
  instanceIndex,
  mix,
  mx_noise_float,
  saturate,
  sin,
  sqrt,
  time,
  uv,
  vec3,
} from "three/tsl";
import { SpriteNodeMaterial } from "three/webgpu";
import type { Node } from "three/webgpu";

import { useQualitySettings } from "@/stores/scene-store";

const INNER_RADIUS = 7;
const OUTER_RADIUS = 26;
const TAU = Math.PI * 2;

/**
 * Per-instance randomness, derived rather than stored.
 *
 * The obvious approach is `range()`, but every `range()` call compiles to its own
 * instanced vertex buffer and WebGPU caps a pipeline at 8 vertex buffers total.
 * Six random values plus the geometry's own attributes blows straight past that
 * limit and the render pipeline fails to compile.
 *
 * Hashing the instance index instead costs no buffers at all: each value is a few
 * integer ops in the vertex shader, and the number of random values per particle
 * becomes unbounded.
 */
const randomFor = (offset: number): Node<"float"> => hash(float(instanceIndex).add(offset));

/**
 * Ambient particle shell.
 *
 * Position, colour and size are all evaluated on the GPU from the instance index.
 * Nothing is stored per particle on the CPU and no JavaScript runs per particle per
 * frame, so 1,500 particles and 40,000 particles cost the main thread exactly the
 * same: one draw call and one automatically-updated `time` uniform. The only thing
 * that scales is GPU fill rate — which is precisely what the adaptive controller
 * measures and reacts to.
 */
export function ParticleField() {
  const { particleCount } = useQualitySettings();

  const geometry = useMemo(() => new PlaneGeometry(1, 1), []);

  const material = useMemo(() => {
    const nodeMaterial = new SpriteNodeMaterial({
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });

    // Uniform sampling on a sphere. Picking a point in a cube and normalising it
    // would bunch particles toward the cube's corners; sampling `z` uniformly and
    // solving for the ring radius spreads them evenly over the surface.
    const azimuth = randomFor(11).mul(TAU);
    const height = randomFor(23).mul(2).sub(1);
    const ringRadius = sqrt(saturate(float(1).sub(height.mul(height))));
    const direction = vec3(ringRadius.mul(cos(azimuth)), height, ringRadius.mul(sin(azimuth)));

    const radius = mix(float(INNER_RADIUS), float(OUTER_RADIUS), randomFor(37));
    const orbitSpeed = mix(float(0.012), float(0.085), randomFor(53));
    const phase = randomFor(71).mul(TAU);
    const size = mix(float(0.02), float(0.11), randomFor(89));
    const tint = randomFor(101);

    const angle = time.mul(orbitSpeed).add(phase);

    // Low-frequency noise breaks up the otherwise perfectly spherical shell.
    const turbulence = mx_noise_float(direction.mul(0.55).add(vec3(0, time.mul(0.05), 0))).mul(1.8);
    const shell = direction.mul(radius.add(turbulence));

    // Explicit rotation about Y rather than a general euler rotation: two trig calls
    // instead of building a full matrix per vertex.
    const cosA = cos(angle);
    const sinA = sin(angle);

    nodeMaterial.positionNode = vec3(
      shell.x.mul(cosA).sub(shell.z.mul(sinA)),
      shell.y.add(sin(time.mul(0.22).add(phase)).mul(0.45)),
      shell.x.mul(sinA).add(shell.z.mul(cosA))
    );
    nodeMaterial.scaleNode = size;

    const accent = new Color("#4fd6e8");
    const violet = new Color("#9b7cf0");
    const ember = new Color("#f0a35e");
    nodeMaterial.colorNode = mix(
      mix(vec3(accent.r, accent.g, accent.b), vec3(violet.r, violet.g, violet.b), tint),
      vec3(ember.r, ember.g, ember.b),
      saturate(tint.sub(0.72).mul(3))
    );

    // Soft round falloff from the quad's UVs turns each flat plane into a glowing
    // point that reads well through the bloom pass.
    const distanceFromCentre = uv().sub(0.5).length();
    nodeMaterial.opacityNode = saturate(distanceFromCentre.mul(2).oneMinus()).pow(2.2).mul(0.85);

    return nodeMaterial;
  }, []);

  useEffect(
    () => () => {
      material.dispose();
      geometry.dispose();
    },
    [material, geometry]
  );

  return (
    <instancedMesh
      key={particleCount}
      args={[geometry, material, particleCount]}
      // Positions exist only on the GPU, so three cannot compute a meaningful
      // bounding sphere and would cull the entire mesh.
      frustumCulled={false}
      renderOrder={2}
    />
  );
}
