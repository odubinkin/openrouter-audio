import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const ROOT_DIR = process.cwd();
const CLI_PATH = path.join(ROOT_DIR, "build", "openrouter-audio", "openrouter-audio.js");

function runCli(args, envPatch = {}) {
  const env = { ...process.env };
  if (Object.prototype.hasOwnProperty.call(envPatch, "OPENROUTER_API_KEY")) {
    if (envPatch.OPENROUTER_API_KEY === null) {
      delete env.OPENROUTER_API_KEY;
    } else {
      env.OPENROUTER_API_KEY = envPatch.OPENROUTER_API_KEY;
    }
  }

  const result = spawnSync(process.execPath, [CLI_PATH, ...args], {
    encoding: "utf8",
    env,
  });

  return {
    status: result.status,
    stdout: result.stdout,
    stderr: result.stderr,
  };
}

test("help prints usage and command overview", () => {
  const result = runCli(["--help"]);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /openrouter-audio transcribe/);
  assert.match(result.stdout, /openrouter-audio generate/);
});

test("unknown command returns non-zero with clear error", () => {
  const result = runCli(["unknown-command"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unknown command 'unknown-command'/);
});

test("generate without text fails validation", () => {
  const result = runCli(["generate"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /generate requires <text>/);
});

test("transcribe without audio file fails validation", () => {
  const result = runCli(["transcribe"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /transcribe requires <audio_file>/);
});

test("generate --dry-run returns JSON payload with default format", () => {
  const result = runCli(["generate", "hello", "--dry-run"], { OPENROUTER_API_KEY: null });
  assert.equal(result.status, 0);

  const payload = JSON.parse(result.stdout);
  assert.equal(payload.format, "mp3");
  assert.equal(typeof payload.transcript, "string");
  assert.equal(payload.paths.length, 1);
  assert.match(payload.paths[0], /\.mp3$/);
});

test("generate --dry-run with --out returns resolved output path", () => {
  const tmp = mkdtempSync(path.join(tmpdir(), "openrouter-audio-test-"));
  const outPath = path.join(tmp, "custom-output.wav");
  const result = runCli(["generate", "welcome", "--dry-run", "--format", "wav", "--out", outPath], {
    OPENROUTER_API_KEY: null,
  });
  assert.equal(result.status, 0);

  const payload = JSON.parse(result.stdout);
  assert.equal(payload.format, "wav");
  assert.deepEqual(payload.paths, [path.resolve(outPath)]);
});

test("generate rejects unsupported voice values", () => {
  const result = runCli(["generate", "hello", "--voice", "invalid-voice"], { OPENROUTER_API_KEY: null });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unsupported voice 'invalid-voice'/);
});

test("transcribe requires API key when not provided", () => {
  const tmp = mkdtempSync(path.join(tmpdir(), "openrouter-audio-test-"));
  const audioPath = path.join(tmp, "sample.wav");
  writeFileSync(audioPath, Buffer.alloc(16));

  const result = runCli(["transcribe", audioPath], { OPENROUTER_API_KEY: null });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /OPENROUTER_API_KEY is not set/);
});

test("transcribe reports missing file when API key exists", () => {
  const result = runCli(["transcribe", "/definitely/missing/file.wav"], { OPENROUTER_API_KEY: "test-key" });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /File not found:/);
});
