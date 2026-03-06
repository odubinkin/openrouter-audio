---
id: "202603060503-H5H79V"
title: "Migrate openrouter-audio skill to TypeScript CLI build"
result_summary: "TypeScript bun-based openrouter-audio CLI implemented with tmp output paths and updated skill packaging."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T05:04:17.746Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved implementation scope and verification contract for TS CLI migration."
verification:
  state: "ok"
  updated_at: "2026-03-06T05:09:09.164Z"
  updated_by: "TESTER"
  note: "Verified: npm run build succeeded; build/openrouter-audio contains compiled openrouter-audio binary and SKILL.md; --help output confirms env key only and defaults; dry-run generate returns tmp path, default format mp3 and stream false, and supports --format wav."
commit:
  hash: "bd06e1672473b0a28b6234790bf79775fbc44a7d"
  message: "🚧 H5H79V skill: migrate openrouter-audio to typescript cli"
comments:
  -
    author: "CODER"
    body: "Start: Implementing TypeScript CLI migration with deterministic build artifacts and updated skill documentation."
  -
    author: "CODER"
    body: "Verified: Built TypeScript bun CLI artifact into build/openrouter-audio, validated help output, and confirmed dry-run generation returns tmp file paths with defaults format=mp3 and stream=false."
events:
  -
    type: "status"
    at: "2026-03-06T05:04:21.098Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing TypeScript CLI migration with deterministic build artifacts and updated skill documentation."
  -
    type: "verify"
    at: "2026-03-06T05:09:09.164Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: npm run build succeeded; build/openrouter-audio contains compiled openrouter-audio binary and SKILL.md; --help output confirms env key only and defaults; dry-run generate returns tmp path, default format mp3 and stream false, and supports --format wav."
  -
    type: "status"
    at: "2026-03-06T05:10:10.929Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Built TypeScript bun CLI artifact into build/openrouter-audio, validated help output, and confirmed dry-run generation returns tmp file paths with defaults format=mp3 and stream=false."
doc_version: 2
doc_updated_at: "2026-03-06T05:10:10.929Z"
doc_updated_by: "CODER"
description: "Rewrite Python openrouter-audio skill into a TypeScript CLI; produce build/openrouter-audio bundle with SKILL.md + executable CLI; API key only from OPENROUTER_API_KEY env; audio generation writes to system tmp and returns generated path(s); default format mp3; stream default false."
id_source: "generated"
---
## Summary


## Scope

In scope: replace openrouter-audio.py/openrouter-audio with TypeScript source and build scripts, update SKILL.md usage docs, add build pipeline outputting build/openrouter-audio containing SKILL.md and executable CLI, enforce env-based API key, default mp3 format, default stream false, save generated audio into system tmp and return output path(s). Out of scope: changes outside this repository, changes to agentplane config.

## Plan

1) Create TypeScript CLI entrypoint for transcribe/generate commands and implement OpenRouter calls using fetch. 2) Enforce API key resolution only from OPENROUTER_API_KEY. 3) Implement audio generation to write output into system tmp and print resulting path(s). 4) Set defaults: output format mp3 when omitted and stream false by default. 5) Add build pipeline that emits build/openrouter-audio with executable CLI and SKILL.md. 6) Update SKILL.md usage/setup docs for TypeScript/Node distribution. 7) Run verification commands and record results.

## Risks

Risk: runtime incompatibility if relying on unavailable global tooling; mitigated by bundling dependencies into build output and shipping runnable Node CLI entrypoint. Risk: API response shape variance for audio generation; mitigated with robust fallback parsing for both non-streaming and streaming response structures.

## Verify Steps

1) npm run build -> succeeds and creates build/openrouter-audio with executable CLI file plus SKILL.md. 2) node build/openrouter-audio/openrouter-audio.js --help -> prints CLI usage. 3) node build/openrouter-audio/openrouter-audio.js generate "test" --dry-run -> prints tmp output path and effective defaults (format mp3, stream false) without API call. 4) node build/openrouter-audio/openrouter-audio.js generate "test" --format wav --dry-run -> prints tmp output path ending with .wav. 5) Validate there is no CLI option for passing API key.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T05:09:09.164Z — VERIFY — ok

By: TESTER

Note: Verified: npm run build succeeded; build/openrouter-audio contains compiled openrouter-audio binary and SKILL.md; --help output confirms env key only and defaults; dry-run generate returns tmp path, default format mp3 and stream false, and supports --format wav.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T05:09:05.931Z, excerpt_hash=sha256:824a1725f99be418f2d11a55a2a663e8b8287a5e4cfb9e3ea3502a15da7acae2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task implementation commit to restore prior Python script and docs, then re-run verification smoke checks.

## Context

Current skill depends on Python + requests and exposes behavior that differs from requested defaults. We need a Node/TypeScript CLI artifact with deterministic packaging for OpenClaw skill consumption.

## Notes

### Approvals / Overrides
- User approved execution and explicitly allowed using bun for build.
- No outside-repo access used.

### Decisions
- Replaced Python implementation with TypeScript source and bun compiled CLI binary.
- Build emits build/openrouter-audio/openrouter-audio and copies SKILL.md into same folder.
- Generate command no longer requires output path; writes audio files into system tmp and returns generated paths as JSON.

### Implementation Notes
- Added src/openrouter-audio.ts implementing transcribe and generate commands with OpenRouter API over fetch.
- Added scripts/build.mjs and package.json scripts for deterministic build output.
- Updated SKILL.md usage and docs for TypeScript plus bun artifact flow.
- Removed legacy openrouter-audio.py and openrouter-audio bash wrapper.

### Evidence / Links
- Build command: npm run build (successful).
- Smoke checks: build/openrouter-audio/openrouter-audio --help, plus dry-run generate checks for default mp3 and stream false and for custom wav format.
