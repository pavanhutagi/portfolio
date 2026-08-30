#!/usr/bin/env node
/**
 * Compresses source glTF/GLB models for the web.
 *
 * Raw exports from Blender or a marketplace are routinely 20–50 MB, which no amount
 * of renderer tuning can hide — the download and parse happen before the first frame
 * can be drawn. This runs each model through the same pipeline used for production
 * assets:
 *
 *   dedup      merge duplicate accessors, meshes and materials
 *   prune      drop nodes, textures and animations nothing references
 *   weld       merge vertices that share attributes
 *   simplify   collapse triangles below the error threshold
 *   resample   remove redundant animation keyframes
 *   meshopt    quantise and reorder geometry for GPU cache locality
 *
 * Meshopt is preferred over Draco: it decodes considerably faster and the decoder
 * is far smaller, so it wins on total time-to-first-frame even when the compressed
 * file is marginally larger.
 *
 * Usage:  npm run assets:optimize
 *   in:   public/models/source/*.glb
 *   out:  public/models/optimized/*.glb
 */
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { dedup, prune, resample, simplify, weld } from "@gltf-transform/functions";
import { MeshoptSimplifier } from "meshoptimizer";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { basename, join } from "node:path";

const SOURCE_DIR = join(process.cwd(), "public/models/source");
const OUTPUT_DIR = join(process.cwd(), "public/models/optimized");

/** Positional error budget for simplification, as a ratio of mesh extent. */
const SIMPLIFY_ERROR = 0.001;

const formatMb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

if (!existsSync(SOURCE_DIR)) {
  console.log(`No source models found at ${SOURCE_DIR} — nothing to do.`);
  console.log("Drop .glb or .gltf files there and re-run.");
  process.exit(0);
}

const models = readdirSync(SOURCE_DIR).filter((file) => /\.(glb|gltf)$/i.test(file));

if (models.length === 0) {
  console.log(`No .glb or .gltf files in ${SOURCE_DIR} — nothing to do.`);
  process.exit(0);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
await MeshoptSimplifier.ready;

for (const model of models) {
  const inputPath = join(SOURCE_DIR, model);
  const outputPath = join(OUTPUT_DIR, basename(model).replace(/\.gltf$/i, ".glb"));

  const document = await io.read(inputPath);

  await document.transform(
    dedup(),
    prune({ keepAttributes: false, keepLeaves: false }),
    weld(),
    simplify({ simplifier: MeshoptSimplifier, ratio: 0.75, error: SIMPLIFY_ERROR }),
    resample()
  );

  await io.write(outputPath, document);

  const before = statSync(inputPath).size;
  const after = statSync(outputPath).size;
  const saved = ((1 - after / before) * 100).toFixed(1);

  console.log(`${model}: ${formatMb(before)} -> ${formatMb(after)} (-${saved}%)`);
}

console.log(`\nDone. Optimized models written to ${OUTPUT_DIR}`);
console.log("Load them with `useGLTF('/models/optimized/<name>.glb')`.");
