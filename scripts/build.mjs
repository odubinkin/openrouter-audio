#!/usr/bin/env node
import { chmodSync, copyFileSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "build", "openrouter-audio");
const sourceCli = path.join(root, "src", "openrouter-audio.ts");
const sourceSkill = path.join(root, "SKILL.md");
const outJs = path.join(outDir, "openrouter-audio.js");
const outWrapper = path.join(outDir, "openrouter-audio");
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
  ["build", sourceCli, "--target", "node", "--format", "cjs", "--outfile", outJs],
  { stdio: "inherit" },
);

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const wrapper = `#!/usr/bin/env bash
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
exec node "$SCRIPT_DIR/openrouter-audio.js" "$@"
`;
writeFileSync(outWrapper, wrapper, "utf8");
chmodSync(outWrapper, 0o755);

copyFileSync(sourceSkill, outSkill);
console.log(`Built skill artifacts in: ${outDir}`);
