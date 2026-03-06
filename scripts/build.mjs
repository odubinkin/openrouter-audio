#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "build", "openrouter-audio");
const sourceCli = path.join(root, "src", "openrouter-audio.ts");
const sourceSkill = path.join(root, "SKILL.md");
const outCli = path.join(outDir, "openrouter-audio");
const outSkill = path.join(outDir, "SKILL.md");

if (!existsSync(sourceCli)) {
  throw new Error(`Missing source CLI: ${sourceCli}`);
}
if (!existsSync(sourceSkill)) {
  throw new Error(`Missing source docs: ${sourceSkill}`);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const build = spawnSync(
  "bun",
  ["build", sourceCli, "--compile", "--outfile", outCli, "--target", "bun"],
  { stdio: "inherit" },
);

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

copyFileSync(sourceSkill, outSkill);
console.log(`Built skill artifacts in: ${outDir}`);
