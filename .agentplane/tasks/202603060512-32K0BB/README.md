---
id: "202603060512-32K0BB"
title: "Switch skill build to JS CLI artifact with launcher"
result_summary: "Default build now emits JS CLI with bash wrapper; binary build moved to separate build:bin command."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T05:13:05.601Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved JS CLI artifact switch and optional binary script addition."
verification:
  state: "ok"
  updated_at: "2026-03-06T05:14:49.288Z"
  updated_by: "TESTER"
  note: "Verified: npm run build outputs openrouter-audio.js, openrouter-audio wrapper, and SKILL.md; wrapper runs --help successfully; npm run build:bin creates openrouter-audio-bin while keeping JS artifacts."
commit:
  hash: "7befc502cb2eab6bb49ac56717d432417265c4a0"
  message: "✅ 32K0BB build: switch default artifacts to js cli + wrapper"
comments:
  -
    author: "CODER"
    body: "Start: Reworking build outputs to JS CLI plus bash wrapper and adding a separate binary build command."
  -
    author: "CODER"
    body: "Verified: build pipeline now outputs openrouter-audio.js + openrouter-audio wrapper + SKILL.md, and separate build:bin creates openrouter-audio-bin without replacing JS artifacts."
events:
  -
    type: "status"
    at: "2026-03-06T05:13:08.004Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Reworking build outputs to JS CLI plus bash wrapper and adding a separate binary build command."
  -
    type: "verify"
    at: "2026-03-06T05:14:49.288Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: npm run build outputs openrouter-audio.js, openrouter-audio wrapper, and SKILL.md; wrapper runs --help successfully; npm run build:bin creates openrouter-audio-bin while keeping JS artifacts."
  -
    type: "status"
    at: "2026-03-06T05:15:01.676Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: build pipeline now outputs openrouter-audio.js + openrouter-audio wrapper + SKILL.md, and separate build:bin creates openrouter-audio-bin without replacing JS artifacts."
doc_version: 2
doc_updated_at: "2026-03-06T05:15:01.676Z"
doc_updated_by: "CODER"
description: "Change build output to JS CLI + bash wrapper launcher instead of binary-only output; keep separate command in package.json to build native binary when needed."
id_source: "generated"
---
## Summary


## Scope

In scope: package.json scripts, scripts/build.mjs behavior, build artifact layout, SKILL.md usage docs. Out of scope: runtime CLI behavior unrelated to build target format.

## Plan

1) Update build script to emit JS CLI file and bash wrapper into build/openrouter-audio. 2) Keep optional native binary build via separate package script. 3) Update SKILL.md artifact docs and usage examples. 4) Run build and smoke checks for wrapper execution and optional binary command. 5) Commit and finish task.

## Risks

Risk: launcher path issues if wrapper points to wrong relative location; mitigated by runtime-tested wrapper script. Risk: docs drift; mitigated by updating SKILL.md examples to new JS+wrapper artifacts.

## Verify Steps

1) npm run build -> outputs build/openrouter-audio/openrouter-audio.js and build/openrouter-audio/openrouter-audio wrapper plus SKILL.md. 2) build/openrouter-audio/openrouter-audio --help -> prints CLI help through wrapper. 3) npm run build:bin -> produces native binary output and exits successfully. 4) package.json contains distinct scripts for JS build and binary build.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T05:14:49.288Z — VERIFY — ok

By: TESTER

Note: Verified: npm run build outputs openrouter-audio.js, openrouter-audio wrapper, and SKILL.md; wrapper runs --help successfully; npm run build:bin creates openrouter-audio-bin while keeping JS artifacts.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T05:14:46.633Z, excerpt_hash=sha256:88edf4e50394c3692732c8c7ce759628f8a5155d20a8ca74d27b9860b15e4a54

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert task commit to restore prior binary-only packaging and previous package scripts.

## Notes

### Approvals / Overrides
- User requested changing build target to JS CLI and explicitly asked to keep binary build as a separate command.

### Decisions
- Default build now produces JavaScript CLI bundle and a bash wrapper launcher.
- Binary compilation retained under a separate script build:bin.
- Binary output file renamed to openrouter-audio-bin to avoid clashing with wrapper name.

### Implementation Notes
- Updated scripts/build.mjs to bundle src/openrouter-audio.ts into openrouter-audio.js using bun in node+cjs target.
- Added wrapper script build/openrouter-audio/openrouter-audio that executes node openrouter-audio.js.
- Added scripts/build-bin.mjs and package.json script build:bin for optional native binary.
- Updated SKILL.md artifact and usage documentation.

### Evidence / Links
- Verified npm run build creates openrouter-audio.js, openrouter-audio wrapper, and SKILL.md in build/openrouter-audio.
- Verified wrapper help output runs successfully.
- Verified npm run build:bin creates openrouter-audio-bin without deleting JS artifacts.
