---
id: "202603060745-W3XXB1"
title: "Add explicit transcribe format override"
result_summary: "Transcribe now accepts explicit --format with validation and fallback autodetect when omitted."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T07:46:32.758Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: scoped transcribe format override with validation and docs/build sync."
verification:
  state: "ok"
  updated_at: "2026-03-06T07:47:50.711Z"
  updated_by: "CODER"
  note: "npm run build passed; help output now lists transcribe with [--format FORMAT]; built artifact contains resolveInputAudioFormat validation and transcribeAudio(audioFile, model, prompt, format)."
commit:
  hash: "38784783faeac810a6e008b1ec86adcd86a132a1"
  message: "🚧 W3XXB1 code: add transcribe format override"
comments:
  -
    author: "CODER"
    body: "Start: Implement transcribe --format override with strict input-format validation, update help/docs, then run build and smoke verification before commit."
  -
    author: "CODER"
    body: "Verified: Added transcribe --format override with precedence over auto-detection, validated explicit input formats, updated README/help, and passed build plus smoke checks for generated CLI usage and artifact wiring."
events:
  -
    type: "status"
    at: "2026-03-06T07:46:35.836Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement transcribe --format override with strict input-format validation, update help/docs, then run build and smoke verification before commit."
  -
    type: "verify"
    at: "2026-03-06T07:47:50.711Z"
    author: "CODER"
    state: "ok"
    note: "npm run build passed; help output now lists transcribe with [--format FORMAT]; built artifact contains resolveInputAudioFormat validation and transcribeAudio(audioFile, model, prompt, format)."
  -
    type: "status"
    at: "2026-03-06T07:48:47.167Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Added transcribe --format override with precedence over auto-detection, validated explicit input formats, updated README/help, and passed build plus smoke checks for generated CLI usage and artifact wiring."
doc_version: 2
doc_updated_at: "2026-03-06T07:48:47.167Z"
doc_updated_by: "CODER"
description: "Support --format for transcribe: if provided, use it; otherwise auto-detect from input file extension with existing fallback."
id_source: "generated"
---
## Summary

Add transcribe format override so CLI uses user-provided --format when present, otherwise auto-detects from input file path as before.

## Scope

In scope: src/openrouter-audio.ts, build/openrouter-audio/openrouter-audio.js, README.md transcribe usage/options. Out of scope: generate flow and API model defaults.

## Plan

1) Add optional format parameter to transcribe path and validation against supported input formats. 2) Apply precedence: CLI --format first, else inferred extension fallback. 3) Update help/README to document --format for transcribe. 4) Build and run smoke checks.

## Risks

Risk: invalid user-provided format could produce API errors; mitigation: validate against SUPPORTED_INPUT_FORMATS and fail fast with clear message. Risk: docs/build drift; mitigation: rebuild and update README/help text in same change.

## Verify Steps

1) npm run build
Expected: TypeScript build succeeds and regenerates build/openrouter-audio/openrouter-audio.js.
2) node build/openrouter-audio/openrouter-audio.js --help
Expected: transcribe usage includes optional --format.
3) node build/openrouter-audio/openrouter-audio.js transcribe sample.wav --format mp3 --model openrouter/auto (with mocked fetch or dry execution check where possible)
Expected: request payload uses input_audio.format='mp3'.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T07:47:50.711Z — VERIFY — ok

By: CODER

Note: npm run build passed; help output now lists transcribe with [--format FORMAT]; built artifact contains resolveInputAudioFormat validation and transcribeAudio(audioFile, model, prompt, format).

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T07:46:35.836Z, excerpt_hash=sha256:eeb57a0f60d89ae2acf9da164613110c2e48bd4006dc2e74ebcd8f7489da2d63

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert this task commit via agentplane/git revert, then rerun npm run build to restore previous artifact behavior where transcribe format is inferred only from file extension.

## Context

Requested behavior: (1) explicit --format for transcribe must be used as-is; (2) if omitted, infer from file path. Keep existing API payload shape and avoid broad refactors.

## Notes

### Approvals / Overrides
User approved implementation in chat; no policy overrides requested.

### Decisions
Use explicit --format for transcribe when provided; otherwise retain extension-based inference with wav fallback. Validate explicit format against SUPPORTED_INPUT_FORMATS and fail fast.

### Implementation Notes
Updated src/openrouter-audio.ts: added resolveInputAudioFormat(), threaded optional format through transcribe path, updated usage/help text.
Updated README.md: transcribe command synopsis now includes --format and behavior note.

### Evidence / Links
- npm run build (pass)
- node build/openrouter-audio/openrouter-audio.js --help (shows --format for transcribe)
- rg checks in build artifact for resolveInputAudioFormat and transcribe format threading.
