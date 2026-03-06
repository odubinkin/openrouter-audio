---
id: "202603060851-ZBBQAG"
title: "Force PCM16 API output and local mp3/ogg encoding"
result_summary: "Generate now always requests pcm16 and converts outputs locally."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T08:52:23.414Z"
  updated_by: "ORCHESTRATOR"
  note: "Plan approved after explicit user confirmation, including network access for dependency install."
verification:
  state: "ok"
  updated_at: "2026-03-06T08:55:46.068Z"
  updated_by: "CODER"
  note: "Verify: npm run build passed; --help now shows default generate format mp3 and local pcm16 conversion note; generate --dry-run defaults to mp3 path; generate --format flac fails as unsupported; source and built artifacts keep API payload audio.format fixed to pcm16."
commit:
  hash: "5b4d089ffefe5f5f0d4569af3a4953cdab362417"
  message: "🚧 ZBBQAG audio: enforce pcm16 API and local format conversion"
comments:
  -
    author: "CODER"
    body: "Start: Implementing fixed pcm16 API output with local mp3/ogg/wav conversion, updating supported formats/defaults, and synchronizing help plus repository documentation."
  -
    author: "CODER"
    body: "Verified: Implemented fixed pcm16 API format for generate requests, added local pcm16 conversion to wav/mp3/ogg using wasm-media-encoders and wav header wrapping, removed flac/opus outputs, switched default format to mp3, and synced help plus docs."
events:
  -
    type: "status"
    at: "2026-03-06T08:52:26.409Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing fixed pcm16 API output with local mp3/ogg/wav conversion, updating supported formats/defaults, and synchronizing help plus repository documentation."
  -
    type: "verify"
    at: "2026-03-06T08:55:46.068Z"
    author: "CODER"
    state: "ok"
    note: "Verify: npm run build passed; --help now shows default generate format mp3 and local pcm16 conversion note; generate --dry-run defaults to mp3 path; generate --format flac fails as unsupported; source and built artifacts keep API payload audio.format fixed to pcm16."
  -
    type: "status"
    at: "2026-03-06T08:56:27.560Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Implemented fixed pcm16 API format for generate requests, added local pcm16 conversion to wav/mp3/ogg using wasm-media-encoders and wav header wrapping, removed flac/opus outputs, switched default format to mp3, and synced help plus docs."
doc_version: 2
doc_updated_at: "2026-03-06T08:56:27.560Z"
doc_updated_by: "CODER"
description: "Always request pcm16 from OpenRouter generate API, convert pcm16 to mp3/ogg locally via wasm-media-encoders, keep wav header wrapping, remove flac/opus from outputs, set default output format to mp3, and update help/docs/SKILL.md."
id_source: "generated"
---
## Summary

Update audio generation so OpenRouter API is always requested with pcm16 output, then convert returned pcm16 to requested local format (mp3/ogg/wav/pcm16). Also align CLI help and repository docs with the new behavior and supported format set.

## Scope

In scope: src/openrouter-audio.ts, package.json, README.md, SKILL.md, and build/openrouter-audio/openrouter-audio.js regenerated via build. Out of scope: changing transcription flow, changing .agentplane/config.json, or introducing additional output codecs beyond pcm16/wav/mp3/ogg.

## Plan

1) Add wasm-media-encoders dependency and implement local conversion utilities for pcm16 -> wav/mp3/ogg. 2) Change generate request payload to always use audio.format=pcm16 with explicit code comment for API compatibility. 3) Keep returned API audio as pcm16 source and convert/write requested format files, including fallback temporary pcm16 file strategy and cleanup where needed. 4) Remove flac/opus from supported output formats and update defaults/help to format=mp3. 5) Update README and SKILL.md to match behavior, including recommendation to use defaults. 6) Build and run CLI smoke checks.

## Risks

1) Encoder API mismatch with expected PCM16 layout can produce invalid mp3/ogg output. Mitigation: align sample rate/channels assumptions with API response behavior and validate generated file sizes/extensions in smoke checks. 2) Temporary file handling may leak intermediate pcm files if cleanup is missed. Mitigation: always unlink intermediate files in finally paths where fallback is used. 3) Behavior drift between source and built artifact. Mitigation: run build after edits and verify generated JS reflects source updates.

## Verify Steps

1) npm install (if lockfile-free dependency update is needed in this repo) and npm run build must succeed. 2) build/openrouter-audio/openrouter-audio --help must show generate default format mp3 and supported outputs wav/mp3/ogg/pcm16 (no flac/opus). 3) build/openrouter-audio/openrouter-audio generate "smoke" --dry-run must return JSON format=mp3 by default. 4) build/openrouter-audio/openrouter-audio generate "smoke" --format flac must fail with unsupported format error. 5) TypeScript/JS path inspection confirms OpenRouter payload always sends audio.format=pcm16 regardless of requested output format.

## Verification

Pending. Verification entries will be appended via agentplane verify after implementation checks.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T08:55:46.068Z — VERIFY — ok

By: CODER

Note: Verify: npm run build passed; --help now shows default generate format mp3 and local pcm16 conversion note; generate --dry-run defaults to mp3 path; generate --format flac fails as unsupported; source and built artifacts keep API payload audio.format fixed to pcm16.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T08:52:26.409Z, excerpt_hash=sha256:4eb8ed3bac5d9dfd0c850df7a332760736aa6340eebc4abfda1820803eb1a2ff

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

If verification fails, revert task changes in src/openrouter-audio.ts, README.md, SKILL.md, package.json, and generated build artifact; remove added dependency references; rebuild to ensure repository returns to pre-task behavior (generate default pcm16 and previous supported formats).

## Context

OpenRouter audio generation currently errors when requesting mp3 directly from API because available output is pcm16. Requested behavior is to always call API with pcm16 and perform local conversion. The change must use wasm-media-encoders for mp3/ogg encoding, keep wav via pcm16 header wrapping, remove flac/opus outputs, and set generate default format to mp3.

## Notes

### Approvals / Overrides
- User explicitly approved plan execution and approved required network access for dependency installation in this run.

### Decisions
- Keep API request audio format fixed to pcm16 for compatibility, and convert to target file format locally.

### Implementation Notes
- Pending implementation.

### Evidence / Links
- Pending.
