#!/usr/bin/env node
import { existsSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "build", "openrouter-audio");
const sourceCli = path.join(root, "src", "openrouter-audio.ts");
const outBin = path.join(outDir, "openrouter-audio-bin");

if (!existsSync(sourceCli)) {
  throw new Error(`Missing source CLI: ${sourceCli}`);
}

mkdirSync(outDir, { recursive: true });

const build = spawnSync(
  "bun",
  ["build", sourceCli, "--compile", "--target", "bun", "--outfile", outBin],
  { stdio: "inherit" },
);

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

console.log(`Built native binary in: ${outBin}`);
